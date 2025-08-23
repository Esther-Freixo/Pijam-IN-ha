import { useNavigate } from "react-router-dom";
import favoriteIcon from "../../assets/icons/coracaoOn.png";
import type { Pijama } from "../../Types/Pijama";
import style from "./style.module.css";

interface ProductCardFavoriteProps {
  pijama: Pijama;
}

export default function ProductCardFavorite({
  pijama,
}: ProductCardFavoriteProps) {
  const priceOnSale = pijama.price * ((100 - (pijama.sale_percent ?? 0)) / 100);

  const navigate = useNavigate();
  return (
    <>
      <section
        onClick={() => navigate(`../pijamas/${pijama.id}`)}
        className={style.section}
      >
        <div className={style.imgContainer}>
          <img src={favoriteIcon} alt="Icone de favorito" />
          <img src={pijama.image} alt={pijama.name} />
        </div>
        <div className={style.textContainer}>
          <p>{pijama.name.toUpperCase()}</p>
          {pijama.on_sale && (
            <span className={style.priceOnSale}>
              R$ {pijama.price.toFixed(2).toString().replace(".", ",")}
            </span>
          )}
          <p>
            R${" "}
            {(pijama.on_sale ? priceOnSale : pijama.price)
              .toFixed(2)
              .toString()
              .replace(".", ",")}
          </p>
          <span className={style.installmentPrice}>
            6x de R${(pijama.price / 6).toFixed(2)}
          </span>
        </div>
      </section>
    </>
  );
}
