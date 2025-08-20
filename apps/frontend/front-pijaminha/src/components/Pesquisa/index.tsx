import React, { useState } from "react";
import styles from "./styles.module.css";

interface SearchBarProps {
  onSearch: (filters: {
    nome: string;
    genero: string;
    tipo: string;
    estacao: string;
  }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("Todos");
  const [tipo, setTipo] = useState("Todos");
  const [estacao, setEstacao] = useState("Todos");

  const handleSearch = () => {
    onSearch({ nome, genero, tipo, estacao });
  };

  return (
    <div className={styles.container}>
      {/* Barra de pesquisa */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Pesquise pelo produto..."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.searchBtn}>
          🔍
        </button>
      </div>

      {/* Filtros */}
      <div className={styles.filters}>
        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option>Gênero</option>
          <option>Unissex</option>
          <option>Masculino</option>
          <option>Feminino</option>
          <option>Família</option>
        </select>

        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option>Tipo</option>
          <option>Adulto</option>
          <option>Infantil</option>
        </select>

        <select value={estacao} onChange={(e) => setEstacao(e.target.value)}>
          <option>Estação</option>
          <option>Inverno</option>
          <option>Verão</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
