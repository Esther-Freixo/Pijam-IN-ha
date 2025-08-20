import { useState } from "react";
import Tamanho, { type Size } from "../../components/Tamanho";
import Quantidade from "../../components/Quantidade";
import pijamaImg from "../../assets/imgPijamaEstatico.jpg";
import style from "./style.module.css";
import favoriteIcon from "../../assets/icons/coracaoOff.png";
import inverno from "../../assets/icons/inverno.png";
import unissex from "../../assets/icons/unissex.png";
import adulto from "../../assets/icons/adulto.png";
import favoritedIcon from "../../assets/icons/coracaoOn.png";

export default function Pijama() {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const onSale = false;
  const price: number = 78.9;
  const priceOnSale: number = price * 0.85;
  const pricePix: number = (onSale ? priceOnSale : price) * 0.85;
  const sizes: Size[] = ["PP", "P", "M", "G", "GG"];
  return (
    <>
      <section className={style.section}>
        <div className={style.pajamaImgContainer}>
          <img src={pijamaImg} alt="" />
        </div>
        <div className={style.pajamaData}>
          <div className={style.pajamaTitle}>
            <h2>PIJAMA FEMININO LONGO - ESTAMPA POÁ</h2>
            <span>Ref: #123456</span>
          </div>
          <div className={style.prices}>
            <div className={style.pricesLeftSide}>
              {onSale && (
                <span>R$ {price.toFixed(2).toString().replace(".", ",")}</span>
              )}
              <p>
                R${" "}
                {(onSale ? priceOnSale : price)
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")}
              </p>
              <p>
                Ou por{" "}
                <span>
                  R$ {pricePix.toFixed(2).toString().replace(".", ",")}
                </span>{" "}
                no PIX
              </p>
            </div>
            <div className={style.pricesRightSide}>
              <p>
                6x de <span>R$13,15</span>
              </p>
            </div>
          </div>
          <div className={style.sizesContainer}>
            <p>Tamanhos:</p>
            <div className={style.buttonsWrapper}>
              {sizes.map((size) => (
                <Tamanho
                  key={size}
                  size={size}
                  isSelected={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                />
              ))}
            </div>
            {selectedSize && (
              <p>
                Ainda temos <span>8</span> peças do tamanho escolhido em nosso
                estoque!
              </p>
            )}
          </div>
          <Quantidade />
          <div className={style.cartAndFavoriteSection}>
            <button>ADICIONAR AO CARRINHO</button>
            <div
              className={`${style.favoriteIcon} ${
                isFavorited ? style.favorited : ""
              }`}
            >
              <img
                src={isFavorited ? favoritedIcon : favoriteIcon}
                onClick={() => setIsFavorited(!isFavorited)}
                alt={
                  isFavorited
                    ? "Remover dos favoritos"
                    : "Adicionar aos favoritos"
                }
              />
            </div>
          </div>
        </div>
      </section>
      <div className={style.iconsContainer}>
        <img src={inverno} alt="" />
        <img src={unissex} alt="" />
        <img src={adulto} alt="" />
      </div>
      <div className={style.descriptionSection}>
        <h3>SOBRE NOSSO PIJAMA</h3>
        <p>
          Esse pijama é perfeito para as noites mais frias do inverno, isso
          graças ao seu tecido que é de alta qualidade, feito com o mais puro
          algodão da Suécia. Além disso, sua cor sofisticada traz a sensação de
          fineza e conforto, o que reflete a alta costura da peça.
        </p>
        <h4>Contém:</h4>
        <ul>
          <li>
            Uma blusa de mangas longas na cor azul petróleo com estampa poá
            branca
          </li>
          <li>Uma calça na cor azul petróleo com estampa poá branca</li>
        </ul>
        <h4>Composição:</h4>
        <ul>
          <li>100% algodão</li>
        </ul>
      </div>
    </>
  );
}
