import React from "react";
import ProductCard from "../ProductCard";
import styles from "./styles.module.css";
import { usePijamasContext } from "../../hooks/usePijamasContext";
import type { Pijama } from "../../Types/Pijama";

interface ProductListProps {
  produtos?: Pijama[];
}

const ProductList: React.FC<ProductListProps> = ({ produtos }) => {
  const { pijamas } = usePijamasContext();
  const listaPijamas = produtos ?? pijamas;

  return (
    <div className={styles.grid}>
      {listaPijamas.map((p) => (
        <ProductCard key={p.id} pijama={p} />
      ))}
    </div>
  );
};

export default ProductList;
