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
          <p>R$ {pijama.price.toString().replace(".", ",")}</p>
        </div>
      </section>
    </>
  );
}
