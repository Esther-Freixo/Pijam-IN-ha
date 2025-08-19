import React from 'react';
import styles from "./styles.module.css";
import { useEstrela } from '../../hooks/useEstrela';
import estrelaCheia from '../../assets/icons/estrelacheia.png';
import estrelaVazia from '../../assets/icons/estrelavazia.png';

export default function Feedback() {
    const { rating, hover, handleClick, handleMouseEnter, handleMouseLeave } = useEstrela();

    return (
        <>
            <div className={styles.main}>
                <div className={styles.box}>
                    <div className={styles.cabecalho}>
                        <h1>Feedback</h1>
                        <p>Fale um pouco sobre a sua experiência com a nossa loja!</p>
                    </div>
                    <form className={styles.form}>
                        <input
                            type="name"
                            placeholder='Nome completo'
                        />
                        <textarea placeholder="Descrição detalhada"></textarea>
                        <div className={styles.avaliacao}>
                            {[...Array(5)].map((_, index) => {
                                const starValue = index + 1;
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleClick(starValue)}
                                        onMouseEnter={() => handleMouseEnter(starValue)}
                                        onMouseLeave={handleMouseLeave}
                                        className={styles.botaoEstrela}
                                    >
                                        <img 
                                            src={starValue <= (hover || rating) ? estrelaCheia : estrelaVazia} 
                                            alt={`${starValue} estrelas`} 
                                        />
                                    </button>
                                );
                            })}
                        </div>
                        <button className={styles.botaoEnviar}>Enviar</button>
                    </form>
                </div>
            </div>
        </>
    );
}