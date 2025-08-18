import style from "./style.module.css";
import instagramIcon from "../../assets/icons/instagram.png";
import facebookIcon from "../../assets/icons/facebook.png";
import linkedinIcon from "../../assets/icons/linkedin.png";
import logoFooter from "../../assets/logo/logo-azul-400.png";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerSection}>
        <div className={style.footerText}>
          <div className={style.adressContainer}>
            <h3>Endereço</h3>
            <p>
              Av. Milton Tavares de Souza, s/n - Sala 115 B - Boa Viagem,
              Niterói - RJ CEP: 24210-315
            </p>
          </div>
          <div className={style.contactContainer}>
            <h3>Fale conosco</h3>
            <p>contato@injunior.com.br</p>
            <div className={style.socialMedia}>
              <a href="https://www.instagram.com/injunioruff/" target="_blank">
                <img src={instagramIcon} alt="Icone do Instagram" />
              </a>
              <a href="https://www.facebook.com/injunioruff" target="_blank">
                <img src={facebookIcon} alt="Icone do Facebook" />
              </a>
              <a
                href="https://www.linkedin.com/company/in-junior/"
                target="_blank"
              >
                <img src={linkedinIcon} alt="Icone do Linkedin" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <img src={logoFooter} alt="Logo da loja Pijaminhas" />
        </div>
        <div className={style.iframeContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.1903028428496!2d-43.13596662526071!3d-22.90635063785432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99817ed79f10f3%3A0xb39c7c0639fbc9e8!2sIN%20Junior%20-%20Empresa%20Junior%20de%20Computa%C3%A7%C3%A3o%20da%20UFF!5e0!3m2!1spt-BR!2sbr!4v1755555356094!5m2!1spt-BR!2sbr"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className={style.copyrightSection}>
        <p>
          © Copyright 2025. IN Junior. Todos os direitos reservados. Niterói,
          Brasil.
        </p>
      </div>
    </footer>
  );
}
