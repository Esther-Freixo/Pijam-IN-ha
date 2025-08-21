import React from "react";
import ProductCard from "../ProductCard";
import styles from "./styles.module.css";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  precoPromocional?: number;
  imagem: string;
  genero: string;
  tipo: string;
  estacao: string;
}

interface ProductListProps {
  produtos: Produto[];
}

const ProductList: React.FC<ProductListProps> = ({ produtos }) => {
  return (
    <div className={styles.grid}>
      {produtos.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  );
};

export default ProductList;
