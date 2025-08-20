import React, { useState } from "react";
import SearchBar from "../../components/Pesquisa";
//import ProductList from "../../components/ProductList";
import Pagination from "../../components/Pagination";
//import produtosData from "../../../backend/produtos.json";

export default function Lista_Pijamas() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const produtosPorPagina = 12;

  const indiceFinal = paginaAtual * produtosPorPagina;
  const indiceInicial = indiceFinal - produtosPorPagina;
  const produtosDaPagina = produtosData.slice(indiceInicial, indiceFinal);

  const totalPaginas = Math.ceil(produtosData.length / produtosPorPagina);

  const handleMudarPagina = (numeroDaPagina: number) => {
    setPaginaAtual(numeroDaPagina);
  };

  return (
    <div>
      <SearchBar />
      <ProductList produtos={produtosDaPagina} />
      <Pagination
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onMudarPagina={handleMudarPagina}
      />
    </div>
  );
}