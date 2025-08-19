import React, { useState } from 'react';
import styles from "./styles.module.css";
import olho from "../../assets/icons/olhosenha.png";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.main}>
            <div className={styles.box}>
                <div className={styles.cabecalho}>
                    <h1>Login</h1>
                    <p>Faça login para ter acesso aos pijamas dos seus <span>sonhos!</span></p>
                </div>
                <form className={styles.form}>
                    <input 
                        type="email" 
                        placeholder='Usuário ou E-mail'
                    />
                    <div className={styles.senha}>
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder='Senha' 
                        />
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className={styles.botaoOlho}
                        >
                            <img src={olho} alt="Mostrar/Ocultar Senha" />
                        </button>
                    </div>
                    <p className={styles.linkEsqueciSenha}>Esqueci minha senha</p>
                    <button className={styles.botaoEntrar}>ENTRAR</button>
                </form>
                <div className={styles.linhaDivisoria}></div>
                <button className={styles.botaoCadastrar}>CADASTRE-SE</button>
            </div>
        </div>
    );
}