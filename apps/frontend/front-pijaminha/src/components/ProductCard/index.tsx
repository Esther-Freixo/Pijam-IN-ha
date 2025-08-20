import React from "react";
import styles from "./styles.module.css";

interface ProductCardProps {
  id: number;
  nome: string;
  preco: number;
  precoPromocional?: number;
  imagem: string;
  genero: string;
  tipo: string;
  estacao: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  nome,
  preco,
  precoPromocional,
  imagem,
}) => {
  return (
    <div className={styles.card}>
      <img src={imagem} alt={nome} className={styles.image} />
      <h3 className={styles.name}>{nome}</h3>
      {precoPromocional ? (
        <div className={styles.priceBox}>
          <p className={styles.oldPrice}>R$ {preco.toFixed(2)}</p>
          <p className={styles.promoPrice}>R$ {precoPromocional.toFixed(2)}</p>
        </div>
      ) : (
        <p className={styles.price}>R$ {preco.toFixed(2)}</p>
      )}
    </div>
  );
};

export default ProductCard;