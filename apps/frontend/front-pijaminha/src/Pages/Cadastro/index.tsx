import styles from "./styles.module.css"

export default function Cadastro() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.box}>
                    <h1>Registre-se</h1>
                    <form className={styles.form}>
                        <input
                            type="name"
                            placeholder='Nome'
                        />
                        <input
                            type="name"
                            placeholder='Nome de usuário'
                        />
                        <input
                            type="email"
                            placeholder='E-mail'
                        />
                        <input
                            type="password"
                            placeholder='Senha'
                        />
                        <input
                            type="password"
                            placeholder='Confirmar senha'
                        />
                        <button className={styles.botaoRegistrar}>Registrar</button>
                    </form>
                </div>
            </div>
        </>
    )
}