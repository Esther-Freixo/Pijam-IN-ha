import carrinhoIconCinza from "../../assets/icons/carrinho-cinza.svg";
import favoriteIconVermelho from "../../assets/icons/coracaoOn.png";
import style from "./style.module.css";
import carrinhoIconVermelho from "../../assets/icons/carrinho-vermelho.svg";
import favoriteIconCinza from "../../assets/icons/coracaoOff.png";
import { useNavigate } from "react-router-dom";

interface HeaderCarrinhoEFavoritosProps {
  carrinhoColor?: string;
  favoriteColor?: string;
  carrinhoPage?: boolean;
}

export default function HeaderCarrinhoEFavoritos({
  carrinhoColor,
  favoriteColor,
  carrinhoPage = false,
}: HeaderCarrinhoEFavoritosProps) {
  const navigate = useNavigate();
  return (
    <section className={style.section}>
      <div onClick={() => navigate("/carrinho")} className={style.carrinhoContainer}>
        <img
          src={carrinhoPage ? carrinhoIconVermelho : carrinhoIconCinza}
          alt="Icone de carrinho"
        />
        <p style={{ color: carrinhoColor }}>Carrinho</p>
      </div>
      <div
        onClick={() => navigate("/favoritos")}
        className={style.favoriteContainer}
      >
        <img
          src={carrinhoPage ? favoriteIconCinza : favoriteIconVermelho}
          alt="Icone de favorito"
        />
        <p style={{ color: favoriteColor }}>Favoritos</p>
      </div>
    </section>
  );
}
