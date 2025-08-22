import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from "./styles.module.css";
import olho from "../../assets/icons/olhosenha.png";
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const userSchema = z.object({
    emailOrUsuario: z.string().nonempty('O e-mail ou usuário não pode ser vazio'),
    password: z.string().nonempty('A senha não pode ser vazia').min(6, 'A senha deve ter no mínimo 6 caracteres')
});

type User = z.infer<typeof userSchema>;

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<User>({
        resolver: zodResolver(userSchema)
    });

    async function handleLogin(data: User) {
        try {
            const isEmail = z.string().email().safeParse(data.emailOrUsuario).success;

            const requestData = isEmail
                ? { email: data.emailOrUsuario, password: data.password }
                : { username: data.emailOrUsuario, password: data.password };

            const response = await axios.post('http://localhost:3333/auth/login', requestData);

            console.log('Login bem-sucedido!', response.data);

            navigate('/');

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    setError('root', {
                        message: "E-mail ou senha incorretos."
                    });
                } else {
                    setError('root', {
                        message: "Ocorreu um erro no servidor. Tente novamente."
                    });
                }
            } else {
                setError('root', {
                    message: "Ocorreu um erro. Verifique sua conexão com a internet."
                });
            }
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.box}>
                <div className={styles.cabecalho}>
                    <h1>Login</h1>
                    <p>Faça login para ter acesso aos pijamas dos seus <span>sonhos!</span></p>
                </div>
                <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input 
                            type="text" 
                            placeholder='Usuário ou E-mail'
                            {...register('emailOrUsuario')}
                        />
                        {errors.emailOrUsuario && <span className={styles.error}>{errors.emailOrUsuario.message}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.senha}>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder='Senha' 
                                {...register('password')}
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
                        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                    </div>
                    
                    <button disabled={isSubmitting} className={styles.botaoEntrar}>{isSubmitting ? 'Carregando...' : 'Entrar'}</button>
                    {errors.root && <span className={styles.error}>{errors.root.message}</span>}
                </form>
                <div className={styles.linhaDivisoria}></div>
                <Link className={styles.botaoCadastrar} to="/cadastro">CADASTRE-SE</Link>
            </div>
        </div>
    );
}