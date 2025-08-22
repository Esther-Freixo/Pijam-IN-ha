import React, { useState } from "react";
import styles from "./styles.module.css";
import { useEstrela } from "../../hooks/useEstrela";
import axios from "axios";

import estrelaCheia from "../../assets/icons/estrelacheia.png";
import estrelaVazia from "../../assets/icons/estrelavazia.png";

export default function Feedback() {
  const { rating, hover, handleClick, handleMouseEnter, handleMouseLeave } = useEstrela();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || rating === 0) {
      alert("Preencha todos os campos e escolha uma quantidade de estrelas!");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:3333/feedbacks", {
        name,
        description,
        rating,
      });
      alert("Feedback enviado com sucesso!");
      setName("");
      setDescription("");
      handleClick(0);
    } catch (err) {
      alert("Erro ao enviar feedback. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <div className={styles.cabecalho}>
          <h1>Feedback</h1>
          <p>Fale um pouco sobre a sua experiência com a nossa loja!</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Descrição detalhada"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
          <button className={styles.botaoEnviar} type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
}
