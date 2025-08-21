import ProductList from "../../components/ProductList";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/Pesquisa";
import { useEffect, useState } from "react";
import { usePijamasContext } from "../../hooks/usePijamasContext";
import { useLocation } from "react-router-dom";

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

  const { pijamas } = usePijamasContext();

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtrosDeBusca, setFiltrosDeBusca] = useState<Filtros>({
    nome: "",
    genero: "",
    tipo: "",
    estacao: "",
  });
  const produtosPorPagina = 12;
  const produtosFiltrados = pijamas.filter((produto) => {
    return (
      produto.name.toLowerCase().includes(filtrosDeBusca.nome.toLowerCase()) &&
      (filtrosDeBusca.genero === "" ||
        produto.gender.toLowerCase() === filtrosDeBusca.genero.toLowerCase()) &&
      (filtrosDeBusca.tipo === "" ||
        produto.type.toLowerCase() === filtrosDeBusca.tipo.toLowerCase()) &&
      (filtrosDeBusca.estacao === "" ||
        produto.season.toLowerCase() === filtrosDeBusca.estacao.toLowerCase())
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
}
