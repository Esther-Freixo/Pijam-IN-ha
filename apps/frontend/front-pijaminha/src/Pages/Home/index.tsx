import React from "react"
import styles from "./styles.module.css"
import banner1 from "../../assets/banners/bannerNatal.png"
import banner2 from "../../assets/banners/bannerValentines.png"
import banner3 from "../../assets/banners/bannerGrupo.png"
import logo1 from "../../assets/logo/logo1.png"
import Carrossel from "../../components/CarrosselComp"

const fotosDoCarrossel = [
  banner1,
  banner2,
  banner3
];



export default function Home() {
    return (
        <>
            <div className={styles.areaAzul}>
                <img src={logo1} alt="Logo" />
                <p>Se os lobos soubessem desse conforto, nem sopravam casas, iam dormir!</p>
            </div>

            <div className={styles.carrossel}>
                <Carrossel images={fotosDoCarrossel} />
            </div>

            <div className={styles.areaBranca}>
                <div>
                    <div>

                    </div>
                    <div>
                        
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}