import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import banner1 from "../../assets/banners/bannerNatal.png";
import banner2 from "../../assets/banners/bannerValentines.png";
import banner3 from "../../assets/banners/bannerGrupo.png";
import logo1 from "../../assets/logo/logoazul.png";
import Carrossel from "../../components/CarrosselComp";
import pessoas from "../../assets/icons/people.png";
import caminhao from "../../assets/icons/caminhaodelivery.png";
import pijama from "../../assets/icons/pijamafeminino.png";

import ProductList from "../../components/ProductList";
import produtosData from "../../produtos.json";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  precoPromocional?: number;
  imagem: string;
  genero: string;
  tipo: string;
  estacao: string;
}

const fotosDoCarrossel = [
  banner1,
  banner2,
  banner3
];

export default function Home() {
    const produtosPromocionais = (produtosData as Produto[]).filter(
      (p) => p.precoPromocional
    );
    const promocoesDestaque = produtosPromocionais.slice(0, 3);

    return (
        <>
            <div className={styles.areaAzul}>
                <img src={logo1} alt="Logo" />
                <p className={styles.paragrafoLogo}>Se os lobos soubessem desse conforto, nem sopravam casas, iam dormir!</p>
            </div>

            <div className={styles.carrossel}>
                <Carrossel images={fotosDoCarrossel} />
            </div>

            <div className={styles.areaBranca}>
                <div className={styles.info}>
                    <div className={styles.fotoEtexto}>
                        <img src={pijama} alt="pijama" />
                        <p id={styles.pijamatxt}>Pijamas confortáveis e com tecnologia</p>
                    </div>
                    <div className={styles.fotoEtexto}>
                        <img src={pessoas} alt="pessoas" />
                        <p id={styles.pessoastxt}>Modelos para todas as idades e tamanhos</p>
                    </div>
                    <div className={styles.fotoEtexto}>
                        <img src={caminhao} alt="caminhao" />
                        <p id={styles.caminhaotxt}>Frete grátis em todo o Brasil e exterior</p>
                    </div>
                </div>
                
                <div>
                    <h1 className={styles.tituloSecao}>Feedbacks</h1>
                    <ProductList produtos={promocoesDestaque} />
                </div>
                
                <div className={styles.feedbackSecao}>
                    <Link className={styles.botao} to="/feedback">
                        Também quero dar um feedback!
                    </Link>
                </div>
            </div>
        </>
    );
}