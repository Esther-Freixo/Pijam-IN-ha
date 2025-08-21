import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
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
  id,
  nome,
  preco,
  precoPromocional,
  imagem,
}) => {
  const navigate = useNavigate();
  const valorFinal = precoPromocional || preco;
  const valorParcela = valorFinal / 6;

  const handleClick = () => {
    navigate(`/pijama/${id}`);
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
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
        <p className={styles.installments}>
          6x de R$ {valorParcela.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
