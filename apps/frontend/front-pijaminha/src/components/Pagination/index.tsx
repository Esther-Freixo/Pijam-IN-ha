import React from "react";
import styles from "./styles.module.css";

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
    const maxNumeros = 5;
    const inicio = Math.max(1, paginaAtual - Math.floor(maxNumeros / 2));
    const fim = Math.min(totalPaginas, inicio + maxNumeros - 1);

    if (inicio > 1) {
      elementos.push(
        <button
          key={1}
          onClick={() => handleClick(1)}
          className={paginaAtual === 1 ? styles.active : styles.pageButton}
        >
          1
        </button>
      );
      if (inicio > 2) {
        elementos.push(<span key="dots-start" className={styles.dots}>...</span>);
      }
    }

    for (let i = inicio; i <= fim; i++) {
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

    if (fim < totalPaginas) {
      if (fim < totalPaginas - 1) {
        elementos.push(<span key="dots-end" className={styles.dots}>...</span>);
      }
      elementos.push(
        <button
          key={totalPaginas}
          onClick={() => handleClick(totalPaginas)}
          className={
            paginaAtual === totalPaginas ? styles.active : styles.pageButton
          }
        >
          {totalPaginas}
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
        &lt;
      </button>
      {renderizarNumeros()}
      <button
        onClick={handleProximo}
        disabled={paginaAtual === totalPaginas}
        className={styles.arrowButton}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;