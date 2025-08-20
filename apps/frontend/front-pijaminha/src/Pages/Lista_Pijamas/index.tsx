
import ProductList from "../../components/ProductList";
import Pagination from "../../components/Pagination";
import produtosData from "../../produtos.json";
import SearchBar from "../../components/Pesquisa";
import { useState } from "react";

interface Filtros {
  nome: string;
  genero: string;
  tipo: string;
  estacao: string;
}

export default function Lista_Pijamas() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtrosDeBusca, setFiltrosDeBusca] = useState<Filtros>({
    nome: '',
    genero: '',
    tipo: '',
    estacao: '',
  });
  const produtosPorPagina = 12;
  const produtosFiltrados = produtosData.filter(produto => {
    return (
      produto.nome.toLowerCase().includes(filtrosDeBusca.nome.toLowerCase()) &&
      (filtrosDeBusca.genero === '' || produto.genero === filtrosDeBusca.genero) &&
      (filtrosDeBusca.tipo === '' || produto.tipo === filtrosDeBusca.tipo) &&
      (filtrosDeBusca.estacao === '' || produto.estacao === filtrosDeBusca.estacao)
    );
  });

  const indiceFinal = paginaAtual * produtosPorPagina;
  const indiceInicial = indiceFinal - produtosPorPagina;
  const produtosDaPagina = produtosFiltrados.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);

  const handleMudarPagina = (numeroDaPagina: number) => {
    setPaginaAtual(numeroDaPagina);
  };

  const handleSearch = (filtros: Filtros) => {
    setFiltrosDeBusca(filtros);
    setPaginaAtual(1);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ProductList produtos={produtosDaPagina} />
      <Pagination
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onMudarPagina={handleMudarPagina}
      />
    </div>
  );
};