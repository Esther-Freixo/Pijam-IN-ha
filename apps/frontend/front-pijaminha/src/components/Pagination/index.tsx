import React from "react";
import styles from "./styles.module.css";
import setaDireita from "../../assets/buttons/btnSetaDireita.png";
import setaEsquerda from "../../assets/buttons/btnSetaEsquerda.png";

interface PaginationProps {
  paginaAtual: number;
  totalPaginas: number;
  onMudarPagina: (numeroDaPagina: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  paginaAtual,
  totalPaginas,
  onMudarPagina,
}) => {
  const handleClick = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      onMudarPagina(pagina);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleProximo = () => {
    handleClick(paginaAtual + 1);
  };

  const handleAnterior = () => {
    handleClick(paginaAtual - 1);
  };

  const renderizarNumeros = () => {
    const elementos = [];
    const blocoTamanho = 4;
    const blocoIndex = Math.floor((paginaAtual - 1) / blocoTamanho);
    const inicio = blocoIndex * blocoTamanho + 1;
    const fim = Math.min(totalPaginas, inicio + blocoTamanho - 1);

    for (let i = inicio; i <= Math.min(totalPaginas, inicio + 1); i++) {
      elementos.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={paginaAtual === i ? styles.active : styles.pageButton}
        >
          {i}
        </button>
      );
    }

    if (inicio + 2 <= fim) {
      elementos.push(
        <span key="dots" className={styles.dots}>
          ...
        </span>
      );
    }

    for (let i = inicio + 2; i <= fim; i++) {
      elementos.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={paginaAtual === i ? styles.active : styles.pageButton}
        >
          {i}
        </button>
      );
    }

    return elementos;
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={handleAnterior}
        disabled={paginaAtual === 1}
        className={styles.arrowButton}
      >
        <img src={setaEsquerda} alt="Anterior" />
      </button>
      {renderizarNumeros()}
      <button
        onClick={handleProximo}
        disabled={paginaAtual === totalPaginas}
        className={styles.arrowButton}
      >
        <img src={setaDireita} alt="Próxima" />
      </button>
    </div>
  );
};

export default Pagination;