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
  // Função para definir o label do placeholder
  const getPlaceholder = (value: string, label: string) => {
    return value === "" ? label : "Todos";
  };
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [tipo, setTipo] = useState("");
  const [estacao, setEstacao] = useState("");

  const handleSearch = () => {
    onSearch({ nome, genero, tipo, estacao });
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Pesquise pelo produto..."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={styles.input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch} className={styles.searchBtn}>
          <img src="/src/assets/icons/pesquisa.png" alt="" />
        </button>
      </div>

      <div className={styles.filters}>
        {/* Adicionado um wrapper para cada select */}
        <div className={styles.selectWrapper}>
          <select value={genero} onChange={(e) => setGenero(e.target.value)}>
            <option value="" disabled>
              {getPlaceholder(genero, "Gênero")}
            </option>
            <option value="">Todos</option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="unissex">Unissex</option>
            <option value="família">Família</option>
          </select>
        </div>

        <div className={styles.selectWrapper}>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="" disabled>
              {getPlaceholder(tipo, "Tipo")}
            </option>
            <option value="">Todos</option>
            <option value="adulto">Adulto</option>
            <option value="infantil">Infantil</option>
          </select>
        </div>

        <div className={styles.selectWrapper}>
          <select value={estacao} onChange={(e) => setEstacao(e.target.value)}>
            <option value="" disabled>
              {getPlaceholder(estacao, "Estação")}
            </option>
            <option value="">Todos</option>
            <option value="verao">Verão</option>
            <option value="inverno">Inverno</option>
            <option value="primavera">Primavera</option>
            <option value="outono">Outono</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;