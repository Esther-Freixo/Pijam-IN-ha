import style from "./style.module.css";
import logo from "../../assets/logo/logo2.png";
import cart from "../../assets/icons/carrinho-branco.png";
import fav from "../../assets/icons/coracao-branco.png";
import user from "../../assets/icons/user.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className={style.header}>
      <div className={style.logoContainer}>
        <img src={logo} alt="Logo da loja Pijaminha" />
      </div>

      <div className={style.links}>
        <p onClick={() => navigate("/lista_pijamas")}>PIJAMAS</p>
        <p onClick={() => navigate("/lista_pijamas?genero=feminino")}>
          FEMININO
        </p>
        <p onClick={() => navigate("/lista_pijamas?genero=masculino")}>
          MASCULINO
        </p>
        <p onClick={() => navigate("/lista_pijamas?genero=infantil")}>
          INFANTIL
        </p>
      </div>
      <div className={style.icons}>
        <div className={style.productsIcons}>
          <img src={cart} alt="Icone de carrinho" />
          <img
            onClick={() => navigate("/favoritos")}
            src={fav}
            alt="Icone de favoritos"
          />
        </div>
        <div className={style.userIcon}>
          <img src={user} alt="Icone do usuario" />
        </div>
      </div>
    </header>
  );
}
