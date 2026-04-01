import { Payment } from '@mercadopago/sdk-react';
import { supabase } from './lib/supaBaseClient';

const MPBrickWrapper = ({ product, userEmail, onClose }) => {
  
  const initialization = {
    amount: product.price || 100, // Fallback price
    payer: {
      email: userEmail || 'test_user_unique_123@test.com',
      entity_type: 'individual',
      type: 'customer'
    },
  };

  const customization = {
    paymentMethods: {
      creditCard: 'all',
      bankTransfer: 'all',
      mercadoPago: 'all',
    },
  };

  const onSubmit = async ({ formData }) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Usuário não logado');
      }

      const payload = {
        formData,
        user_id: user.id,
        product_id: product.id,
        price: product.price || 100,
      };

      const { data, error } = await supabase.functions.invoke('payment', { body: payload });

      if (error) {
        throw error;
      }

      if (data?.status === 'approved') {
        onClose?.();
        return;
      }

      throw new Error('Pagamento não aprovado');
    } catch (err) {
      console.error('Erro no pagamento:', err);
      throw err;
    }
  };

  const onError = async (error) => {
    // This runs if the Brick itself crashes (e.g. invalid API key)
    console.log("BRICK INTERNAL ERROR:", error);
  };

  const onReady = async () => {
    console.log("Brick Ready");
  };

  return (
    <div style={{width: '100%'}}>
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </div>
  );
};

export default MPBrickWrapper;
