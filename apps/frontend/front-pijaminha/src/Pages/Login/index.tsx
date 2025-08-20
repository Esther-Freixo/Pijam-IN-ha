import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from "./styles.module.css";
import olho from "../../assets/icons/olhosenha.png";
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSchema = z.object({
    emailOrUsuario: z.string().nonempty('O e-mail ou usuário não pode ser vazio')
    .refine(value => z.string().email().safeParse(value).success, {
        message: 'O e-mail ou usuário não é válido'
    }),
    password: z.string().nonempty('A senha não pode ser vazia').min(6, 'A senha deve ter no mínimo 6 caracteres')
});

type User = z.infer<typeof userSchema>;

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<User>({
        resolver: zodResolver(userSchema)
    });

    async function createUser(data: User) {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log(data);
            throw new Error('Erro ao criar usuário');
        } catch {
            setError('root', {
                message: "Erro ao entrar"
            });
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.box}>
                <div className={styles.cabecalho}>
                    <h1>Login</h1>
                    <p>Faça login para ter acesso aos pijamas dos seus <span>sonhos!</span></p>
                </div>
                <form onSubmit={handleSubmit(createUser)} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input 
                            type="email" 
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