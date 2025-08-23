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
import { useCart } from "../../stores/carrinhoContext";
import { useNavigate } from "react-router-dom";
import verao from "../../assets/icons/verao.png";
import feminino from "../../assets/icons/feminino.png";
import ambos from "../../assets/icons/ambos.png";
import infantil from "../../assets/icons/infantil.png";
import familia from "../../assets/icons/familia.png";
import masculino from "../../assets/icons/masculino.png";

export default function Pijama() {
  const { pijamas } = usePijamasContext();
  const { pijamaId } = useParams();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedStock, setSelectedStock] = useState<number | null>(null);
  const pijama = pijamas.find((pijama) => pijama.id === pijamaId);
  const [isFavorited, setIsFavorited] = useState<boolean>(
    () => pijama?.favorite ?? false
  );
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  if (!pijama) {
    return <div>Pijama nao encontrado</div>;
  }

  const handleFavoriteClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/pajamas/${pijama.id}/favorite`,
        {
          method: "PATCH",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setIsFavorited(data.pajama.favorite);
        console.log("funcionou");
      } else {
        alert("Erro ao atualizar favorito");
      }
    } catch (error) {
      console.error("Erro de conexão com o servidor", error);
    }
  };

  const sizes: Size[] = pijama.sizes.map((s) => s.size as Size);

  const handleSizeClick = (size: Size) => {
    setSelectedSize(size);
    const sizeObj = pijama.sizes.find((s) => s.size === size);
    setSelectedStock(sizeObj ? sizeObj.stock_quantity : null);
  };

  const priceOnSale: number =
    pijama.price * ((100 - (pijama.sale_percent ?? 0)) / 100);
  const pricePix: number = (pijama.on_sale ? priceOnSale : pijama.price) * 0.85;
  const installmentPrice = (pijama.price / 6).toFixed(2);

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
                  onClick={() => handleSizeClick(size)}
                />
              ))}
            </div>
            {selectedSize && (
              <p>
                Ainda temos <span>{selectedStock ?? 0}</span> peças do tamanho
                escolhido em nosso estoque!
              </p>
            )}
          </div>
          <Quantidade
            quantity={quantity}
            onIncrease={() => {
              if (selectedStock !== null && quantity < selectedStock) {
                setQuantity((prev) => prev + 1);
              }
            }}
            onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
          />
          <div className={style.cartAndFavoriteSection}>
            <button
              onClick={() => {
                if (!selectedSize) {
                  alert("Selecione um tamanho");
                  return;
                }

                const item = {
                  id: String(pijama.id),
                  name: pijama.name,
                  image: pijama.image,
                  price: pijama.on_sale ? priceOnSale : pijama.price,
                  quantity: quantity,
                  size: selectedSize,
                };

                addToCart(item);
                navigate("/");
              }}
            >
              ADICIONAR AO CARRINHO
            </button>
            <div
              className={`${style.favoriteIcon} ${
                isFavorited ? style.favorited : ""
              }`}
            >
              <img
                src={isFavorited ? favoritedIcon : favoriteIcon}
                onClick={handleFavoriteClick}
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
        {pijama.season === "verao" && <img src={verao} alt="Verão" />}
        {pijama.season === "inverno" && <img src={inverno} alt="Inverno" />}

        {pijama.type === "adulto" && <img src={adulto} alt="Adulto" />}
        {pijama.type === "infantil" && <img src={infantil} alt="Infantil" />}
        {pijama.type === "familia" && <img src={familia} alt="Família" />}

        {pijama.gender === "feminino" && <img src={feminino} alt="Feminino" />}
        {pijama.gender === "masculino" && (
          <img src={masculino} alt="Masculino" />
        )}
        {pijama.gender === "unissex" && <img src={unissex} alt="Unissex" />}
        {pijama.gender === "ambos" && <img src={ambos} alt="Ambos" />}
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
