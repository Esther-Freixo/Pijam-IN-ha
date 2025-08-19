import style from "./style.module.css";
import btnSubtract from "../../assets/buttons/btnSubtract.svg";
import btnAdd from "../../assets/buttons/btnAdd.svg";
import { useState } from "react";

export default function Quantidade() {
  const [quantity, setQuantity] = useState<number>(1);
  function handleIncrease() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }
  function handleDecrease() {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }
  return (
    <div className={style.quantity}>
      <p>Quantidade:</p>
      <div className={style.quantityControls}>
        <img
          onClick={handleDecrease}
          src={btnSubtract}
          alt="Botão de subtração"
        />
        <p>{quantity}</p>
        <img onClick={handleIncrease} src={btnAdd} alt="Botão de adição" />
      </div>
    </div>
  );
}
