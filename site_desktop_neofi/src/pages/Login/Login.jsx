import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import LogoNeofi from './../../assets/Home/NeoFiLogoNoTextBlue.png';
import { Link, useNavigate } from 'react-router-dom';
import { logarUsuario } from '../../lib/supaBaseClient';

const Login = () => {

    const navigate = useNavigate();
    useEffect(() => {
        document.body.classList.add("background-class");

        return () => {
            document.body.classList.remove("background-class");
        };
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();
        const { data, error } = await logarUsuario(email, password);

        if (error) {
            alert("Erro ao entrar: " + error.message);
        } else {
            console.log("Login bem sucedido!", data);
            navigate('/');
        }

    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.container}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <div className={styles.logoContainer}>
                    <img src={LogoNeofi} className={styles.logo} />
                </div>

                {/* email Input */}
                <div className={styles.inputGroup}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu usuário"
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
                            placeholder="Digite sua senha"
                            required
                        />
                        <button
                            type="button"
                            className={styles.toggleBtn}
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                // Eye Off Icon (SVG)
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M1 1l22 22" />
                                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                </svg>
                            ) : (
                                // Eye Icon (SVG)
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <button type="submit" className={styles.submitBtn}>
                    Entrar
                </button>

                <div className={styles.footerLinks}>
                    <span className={styles.footerText}>Não tem uma conta? </span>
                    <Link to="/signup">Cadastre-se</Link>
                </div>

            </form>
        </div>
    );
};

export default Login;