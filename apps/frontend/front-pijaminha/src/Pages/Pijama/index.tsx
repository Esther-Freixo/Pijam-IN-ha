import { useState } from "react";
import { useParams } from "react-router-dom";
import Tamanho, { type Size } from "../../components/Tamanho";
import Quantidade from "../../components/Quantidade";
import style from "./style.module.css";
import favoriteIcon from "../../assets/icons/coracaoOff.png";
import inverno from "../../assets/icons/inverno.png";
import unissex from "../../assets/icons/unissex.png";
import adulto from "../../assets/icons/adulto.png";
import favoritedIcon from "../../assets/icons/coracaoOn.png";
import produtos from "../../produtos.json";
import pijamaImg from "../../assets/pijama/pijama.png";

const imagens: Record<string, string> = {
  "pijama.png": pijamaImg,
};

export default function Pijama() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const produto = produtos.find((p) => String(p.id) === id);
  if (!produto) {
    return <div>Produto não encontrado.</div>;
  }
  const onSale = produto.precoPromocional !== undefined;
  const price = produto.preco;
  const priceOnSale = produto.precoPromocional || produto.preco;
  const pricePix = (onSale ? priceOnSale : price) * 0.85;
  const sizes = produto.size || [];
  return (
    <>
      <section className={style.section}>
        <div className={style.pajamaImgContainer}>
          <img 
            src={imagens[produto.imagem] || pijamaImg} 
            alt={produto.nome}/>
        </div>
        <div className={style.pajamaData}>
          <div className={style.pajamaTitle}>
            <h2>{produto.nome}</h2>
            <span>Ref: #{produto.id}</span>
          </div>
          <div className={style.prices}>
            <div className={style.pricesLeftSide}>
              {onSale && (
                <span>R$ {price.toFixed(2).toString().replace(".", ",")}</span>
              )}
              <p>
                R$ {(onSale ? priceOnSale : price).toFixed(2).toString().replace(".", ",")}
              </p>
              <p>
                Ou por <span>R$ {pricePix.toFixed(2).toString().replace(".", ",")}</span> no PIX
              </p>
            </div>
            <div className={style.pricesRightSide}>
              <p>
                6x de <span>R$ {(priceOnSale / 6).toFixed(2).toString().replace(".", ",")}</span>
              </p>
            </div>
          </div>
          <div className={style.sizesContainer}>
            <p>Tamanhos:</p>
            <div className={style.buttonsWrapper}>
              {sizes.map((sizeObj) => (
                <Tamanho
                  key={sizeObj.size}
                  size={sizeObj.size as Size}
                  isSelected={selectedSize === (sizeObj.size as Size)}
                  onClick={() => setSelectedSize(sizeObj.size as Size)}
                />
              ))}
            </div>
            {selectedSize && (
              <p>
                Ainda temos <span>{sizes.find(s => s.size === selectedSize)?.stock_quantity ?? 0}</span> peças do tamanho escolhido em nosso estoque!
              </p>
            )}
          </div>
          <Quantidade />
          <div className={style.cartAndFavoriteSection}>
            <button>ADICIONAR AO CARRINHO</button>
            <div
              className={`${style.favoriteIcon} ${isFavorited ? style.favorited : ""}`}
            >
              <img
                src={isFavorited ? favoritedIcon : favoriteIcon}
                onClick={() => setIsFavorited(!isFavorited)}
                alt={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              />
            </div>
          </div>
        </div>
      </section>
      <div className={style.iconsContainer}>
        <img src={inverno} alt="inverno" />
        <img src={unissex} alt="unissex" />
        <img src={adulto} alt="adulto" />
      </div>
      <div className={style.descriptionSection}>
        <h3>SOBRE NOSSO PIJAMA</h3>
        <p>
          Esse pijama é perfeito para as noites mais frias do inverno, isso graças ao seu tecido que é de alta qualidade, feito com o mais puro algodão da Suécia. Além disso, sua cor sofisticada traz a sensação de fineza e conforto, o que reflete a alta costura da peça.
        </p>
        <h4>Contém:</h4>
        <ul>
          <li>Uma blusa de mangas longas na cor azul petróleo com estampa poá branca</li>
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