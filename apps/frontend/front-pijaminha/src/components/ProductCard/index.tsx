import React from "react";
import styles from "./styles.module.css";
// IMPORTANTE: Importe os ícones aqui primeiro
import coracaoIcon from "../../assets/icons/coracaoOff.png";
import descontoIcon from "../../assets/icons/desconto.png";


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
  // Lógica para calcular o valor da parcela
  const valorFinal = precoPromocional || preco;
  const valorParcela = valorFinal / 6;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imagem} alt={nome} className={styles.image} />
        <div className={styles.heartIcon}>
          {/* Use a variável importada aqui */}
          <img src={coracaoIcon} alt="Coração" />
        </div>
        {precoPromocional && (
          <div className={styles.discountIcon}>
            {/* Use a variável importada aqui */}
            <img src={descontoIcon} alt="Desconto" />
          </div>
        )}
      </div>
      <div className={styles.contentBox}>
        <h3 className={styles.name}>{nome}</h3>
        {precoPromocional ? (
          <div className={styles.priceBox}>
            <p className={styles.oldPrice}>R$ {preco.toFixed(2)}</p>
            <p className={styles.promoPrice}>
              R$ {precoPromocional.toFixed(2)}
            </p>
          </div>
        ) : (
          <p className={styles.price}>R$ {preco.toFixed(2)}</p>
        )}
        <p className={styles.installments}>6x de R$ {valorParcela.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;