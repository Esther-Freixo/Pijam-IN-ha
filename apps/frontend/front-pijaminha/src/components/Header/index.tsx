import style from "./style.module.css";
import logo from "../../assets/logo/logo2.png";
import cart from "../../assets/icons/carrinho-branco.png";
import fav from "../../assets/icons/coracao-branco.png";
import user from "../../assets/icons/user.png";

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.logoContainer}>
        <img src={logo} alt="Logo da loja Pijaminha" />
      </div>
      <div className={style.links}>
        <p>PIJAMAS</p>
        <p>FEMININO</p>
        <p>MASCULINO</p>
        <p>INFANTIL</p>
      </div>
      <div className={style.icons}>
        <div className={style.productsIcons}>
          <img src={cart} alt="Icone de carrinho" />
          <img src={fav} alt="Icone de favoritos" />
        </div>
        <div className={style.userIcon}>
          <img src={user} alt="Icone do usuario" />
        </div>
      </div>
    </header>
  );
}
