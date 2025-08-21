import ProductList from "../../components/ProductList";
import Pagination from "../../components/Pagination";
import produtosData from "../../produtos.json";
import SearchBar from "../../components/Pesquisa";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.css";

interface Filtros {
  nome: string;
  genero: string;
  tipo: string;
  estacao: string;
}

export default function Lista_Pijamas() {
 

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genero = params.get("genero") || "";
    const tipo = params.get("tipo") || "";
    setFiltrosDeBusca((filtros) => ({
      ...filtros,
      genero,
      tipo,
    }));
    setPaginaAtual(1);
  }, [location.search]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtrosDeBusca, setFiltrosDeBusca] = useState<Filtros>({
    nome: "",
    genero: "",
    tipo: "",
    estacao: "",
  });
  const produtosPorPagina = 12;
  const produtosFiltrados = produtosData.filter((produto) => {
    return (
      produto.nome.toLowerCase().includes(filtrosDeBusca.nome.toLowerCase()) &&
      (filtrosDeBusca.genero === "" ||
        produto.genero.toLowerCase() === filtrosDeBusca.genero.toLowerCase()) &&
      (filtrosDeBusca.tipo === "" ||
        produto.tipo.toLowerCase() === filtrosDeBusca.tipo.toLowerCase()) &&
      (filtrosDeBusca.estacao === "" ||
        produto.estacao.toLowerCase() === filtrosDeBusca.estacao.toLowerCase())
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
    <div className={styles.corpo}>
      <SearchBar onSearch={handleSearch} />
      <ProductList produtos={produtosDaPagina} />
      <Pagination
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onMudarPagina={handleMudarPagina}
      />
    </div>
  );
}
