import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import favoriteIcon from "../../assets/icons/coracaoOff.png";
import favoritedIcon from "../../assets/icons/coracaoOn.png";
import descontoIcon from "../../assets/icons/desconto.png";
import type { Pijama } from "../../Types/Pijama";

interface ProductCardProps {
  pijama: Pijama;
}

const ProductCard: React.FC<ProductCardProps> = ({ pijama }) => {
  const navigate = useNavigate();
  const { id, name, image, price, on_sale, sale_percent, favorite } = pijama;

  const priceOnSale = price * (1 - (sale_percent ?? 0));
  const valorFinal = priceOnSale || price;
  const valorParcela = valorFinal / 6;

  const [isFavorited, setIsFavorited] = useState<boolean>(favorite ?? false);

  const handleClick = () => {
    navigate(`/pijamas/${id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited((prev) => !prev);
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
        <div className={styles.heartIcon}>
          <img
            src={isFavorited ? favoritedIcon : favoriteIcon}
            alt="Coração"
            onClick={handleFavoriteClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        {on_sale && (
          <div className={styles.discountIcon}>
            <img src={descontoIcon} alt="Desconto" />
          </div>
        )}
      </div>
      <div className={styles.contentBox}>
        <h3 className={styles.name}>{name}</h3>
        {on_sale ? (
          <div className={styles.priceBox}>
            <p className={styles.oldPrice}>R$ {price.toFixed(2)}</p>
            <p className={styles.promoPrice}>R$ {priceOnSale.toFixed(2)}</p>
          </div>
        ) : (
          <p className={styles.price}>R$ {price.toFixed(2)}</p>
        )}
        <p className={styles.installments}>
          6x de R$ {valorParcela.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
