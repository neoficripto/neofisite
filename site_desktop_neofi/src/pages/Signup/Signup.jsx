import { useState, useEffect } from 'react';
import styles from './Signup.module.css'; // Using a separate CSS module
import LogoNeofi from './../../assets/Home/NeoFiLogoNoText.png';
import { Link, useNavigate } from 'react-router-dom';
import { adicionarNovaConta } from '../../lib/supaBaseClient';

const Signup = () => {

    const navigate = useNavigate();
    useEffect(() => {
        document.body.classList.add("background-class");

        return () => {
            document.body.classList.remove("background-class");
        };
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        const { error } = await adicionarNovaConta(email, password);

        if (error) {
            alert("Erro ao cadastrar: " + error.message);
        } else {
            navigate('/');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.container}>
            <form className={styles.signupForm} onSubmit={handleSubmit}>
                <div className={styles.logoContainer}>
                    <img src={LogoNeofi} className={styles.logo} alt="NeoFi Logo" />
                </div>

                <h2 className={styles.title}>Criar Conta</h2>

                {/* Username Input */}
                <div className={styles.inputGroup}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu E-mail"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Senha</label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Crie uma senha"
                            required
                        />
                        <button
                            type="button"
                            className={styles.toggleBtn}
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M1 1l22 22" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /></svg>
                            ) : (
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Confirm Password Input */}
                <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirme sua senha"
                            required
                        />
                         {/* We replicate the toggle button here or keep it hidden if you want one toggle for both */}
                    </div>
                </div>

                <button type="submit" className={styles.submitBtn}>
                    Cadastrar
                </button>

                <div className={styles.footerLinks}>
                    <span className={styles.footerText}>Já tem uma conta? </span>
                    <Link to="/login">Entrar</Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;
