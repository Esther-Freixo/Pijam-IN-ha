import style from "./styles.module.css";
import Quantidade from "../Quantidade";
import type { CartItem as CartItemType } from "../../Types/Pijama";

interface Props {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItem({ item, onIncrease, onDecrease, onRemove }: Props) {
  const itemSubtotal = item.price * item.quantity;

  return (
    <div className={style.cartItem}>
      <img src={item.image} alt={item.name} className={style.itemImage} />

      <div className={style.itemDetails}>
        <h3>{item.name}</h3>
        <p className={style.size}>Tamanho: <span>{item.size}</span></p>
      </div>

      <div className={style.itemControls}>
        <Quantidade
          quantity={item.quantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
        <p className={style.itemSubtotal}>
          R$ {itemSubtotal.toFixed(2).replace(".", ",")}
        </p>
        <button onClick={onRemove} className={style.removeButton}>
          X
        </button>
      </div>
    </div>
  );
}
