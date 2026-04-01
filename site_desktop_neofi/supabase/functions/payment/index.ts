import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { MercadoPagoConfig, Payment } from 'npm:mercadopago';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 1. Handle the "Bouncer" (CORS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 2. Setup Mercado Pago
    const client = new MercadoPagoConfig({ 
        accessToken: Deno.env.get('MP_ACCESS_TOKEN') ?? '' 
    });
    const payment = new Payment(client);

    // 3. Receive the Data (This is what /process_payment receives)
    const body = await req.json();
    const { formData, user_id, product_id, price } = body;

    // --- THE FIX ---
    // The docs say: "Send transaction_amount, token, description, installments, payment_method_id, and payer."
    // Your previous code was deleting the 'payer' details (CPF). This fixes it:
    
    const paymentPayload = {
        transaction_amount: Number(price),
        token: formData.token,
        description: formData.description,
        installments: formData.installments,
        payment_method_id: formData.payment_method_id,
        issuer_id: formData.issuer_id,
        payer: {
            email: formData.payer.email || 'custom@test.com',
            identification: formData.payer.identification, // <--- CRITICAL: Sending the CPF
            type: formData.payer.type || 'customer'
        }
    };
    // ----------------

    console.log("Sending to MP:", JSON.stringify(paymentPayload)); 

    // 4. Process the Payment
    const paymentResult = await payment.create({
        body: paymentPayload
    });

    // 5. Save to Database (If approved)
    if (paymentResult.status === 'approved') {
        const { error: dbError } = await supabaseAdmin
            .from('orders')
            .insert({
                user_id: user_id,
                product_id: product_id,
                amount_paid: paymentResult.transaction_amount,
                status: 'paid',
                mp_payment_id: paymentResult.id.toString(),
                currency: 'BRL'
            });
        
        if (dbError) console.error("Order Save Error:", dbError);
    }

    return new Response(JSON.stringify(paymentResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})