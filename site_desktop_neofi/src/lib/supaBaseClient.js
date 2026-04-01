import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rvohagncenpfpnpgmixg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_YcQ2jT9O-w_3330A8Sj_kw_KX5RMYUa';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const adicionarNovaConta =  async ( email, password ) => {

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    return { data, error };

}

export const logarUsuario = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    return { data, error };
}
