import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from "./styles.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cadastroSchema = z.object({
  nome: z.string().nonempty('O nome não pode ser vazio')
    .refine(value => !/\d/.test(value), 'O nome não pode conter números'),
  usuario: z.string().nonempty('O nome de usuário não pode ser vazio')
    .refine(value => !value.includes(' ') && !/[áéíóúÁÉÍÓÚãõÃÕâêîôûÂÊÎÔÛ]/.test(value), 
      'O nome de usuário não pode ter espaços ou acentos'),
  email: z.string().nonempty('O e-mail não pode ser vazio')
    .email('O e-mail não é válido'),
  senha: z.string().nonempty('A senha não pode ser vazia')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .refine(value => !value.includes(' '), 'A senha não pode conter espaços'),
  confirmarSenha: z.string().nonempty('A confirmação de senha não pode ser vazia'),
}).refine(data => data.senha === data.confirmarSenha, {
  message: 'As senhas não coincidem',
  path: ['confirmarSenha'],
});

type CadastroData = z.infer<typeof cadastroSchema>;

export default function Cadastro() {
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<CadastroData>({
        resolver: zodResolver(cadastroSchema),
    });

    async function handleRegister(data: CadastroData) {
        try {
            const response = await axios.post('http://localhost:3333/auth/register', {
                name: data.nome,
                username: data.usuario,
                email: data.email,
                password: data.senha,
            });

            if (response.status === 201) {
                alert('Cadastro realizado com sucesso! Você já pode fazer login.');
                reset();
                navigate('/login');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    setError('root', {
                        message: "Erro: O e-mail ou nome de usuário já está em uso."
                    });
                } else {
                    setError('root', {
                        message: "Ocorreu um erro no servidor. Tente novamente."
                    });
                }
            } else {
                setError('root', {
                    message: "Ocorreu um erro de rede. Verifique sua conexão."
                });
            }
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.box}>
                <div className={styles.cabecalho}>
                    <h1>Registre-se</h1>
                </div>
                <form onSubmit={handleSubmit(handleRegister)} className={styles.form}>
                    <div className={styles.inputs}>
                        <input 
                            type="text" 
                            placeholder='Nome'
                            {...register('nome')}
                        />
                        {errors.nome && <span className={styles.error}>{errors.nome.message}</span>}
                        
                        <input 
                            type="text" 
                            placeholder='Nome de Usuário'
                            {...register('usuario')}
                        />
                        {errors.usuario && <span className={styles.error}>{errors.usuario.message}</span>}

                        <input 
                            type="email" 
                            placeholder='E-mail'
                            {...register('email')}
                        />
                        {errors.email && <span className={styles.error}>{errors.email.message}</span>}

                        <input 
                            type="password"
                            placeholder='Senha'
                            {...register('senha')}
                        />
                        {errors.senha && <span className={styles.error}>{errors.senha.message}</span>}
                        
                        <input 
                            type="password"
                            placeholder='Confirmar senha'
                            {...register('confirmarSenha')}
                        />
                        {errors.confirmarSenha && <span className={styles.error}>{errors.confirmarSenha.message}</span>}
                        
                        {errors.root && <span className={styles.error}>{errors.root.message}</span>}
                    </div>
                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className={styles.botaoRegistrar}
                    >
                        {isSubmitting ? 'Carregando...' : 'REGISTRAR'}
                    </button>
                </form>
            </div>
        </div>
    );
}