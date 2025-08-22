import { useState } from "react";
import Tamanho, { type Size } from "../../components/Tamanho";
import Quantidade from "../../components/Quantidade";
import style from "./style.module.css";
import favoriteIcon from "../../assets/icons/coracaoOff.png";
import inverno from "../../assets/icons/inverno.png";
import unissex from "../../assets/icons/unissex.png";
import adulto from "../../assets/icons/adulto.png";
import favoritedIcon from "../../assets/icons/coracaoOn.png";
import { usePijamasContext } from "../../hooks/usePijamasContext";
import { useParams } from "react-router-dom";

export default function Pijama() {
  const { pijamas } = usePijamasContext();
  console.log(typeof pijamas);
  const { pijamaId } = useParams();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const pijama = pijamas.find((pijama) => pijama.id === pijamaId);
  console.log(pijama?.image);
  const [isFavorited, setIsFavorited] = useState<boolean>(
    () => pijama?.favorite ?? false
  );
  if (!pijama) {
    return <div>Pijama nao encontrado</div>;
  }

  const priceOnSale: number = pijama.price * (1 - (pijama.sale_percent ?? 0));
  const pricePix: number = (pijama.on_sale ? priceOnSale : pijama.price) * 0.85;
  const installmentPrice = (pijama.price / 6).toFixed(2);
  const sizes: Size[] = ["PP", "P", "M", "G", "GG"];
  return (
    <>
      <section className={style.section}>
        <div className={style.pajamaImgContainer}>
          <img src={pijama.image} alt="" />
        </div>
        <div className={style.pajamaData}>
          <div className={style.pajamaTitle}>
            <h2>{pijama.name}</h2>
            <span>#{pijama.id}</span>
          </div>
          <div className={style.prices}>
            <div className={style.pricesLeftSide}>
              {pijama.on_sale && (
                <span>
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
                6x de {""}
                <span>
                  R${""}
                  {installmentPrice}
                </span>
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
        <p>{pijama.description}</p>
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
