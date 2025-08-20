import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from "./styles.module.css";

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
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Dados a serem enviados:', data);
            console.log('Usuário registrado com sucesso!');
            reset();
            alert('Cadastro realizado com sucesso! Você já pode fazer login.');
        } catch (error) {
            setError('root', {
                message: "Erro ao registrar. Tente novamente."
            });
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

                        <div className={styles.senha}>
                            <input 
                                type="password"
                                placeholder='Senha'
                                {...register('senha')}
                            />
                        </div>
                        {errors.senha && <span className={styles.error}>{errors.senha.message}</span>}
                        
                        <div className={styles.senha}>
                            <input 
                                type="password"
                                placeholder='Confirmar senha'
                                {...register('confirmarSenha')}
                            />
                        </div>
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