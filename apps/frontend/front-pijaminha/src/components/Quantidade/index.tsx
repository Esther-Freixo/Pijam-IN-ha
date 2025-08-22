import style from "./style.module.css";
import btnSubtract from "../../assets/buttons/btnSubtract.svg";
import btnAdd from "../../assets/buttons/btnAdd.svg";
import { useState } from "react";

// Define a interface para as props que o componente pode receber
interface QuantidadeProps {
  quantity?: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

export default function Quantidade({
  quantity,
  onIncrease,
  onDecrease,
}: QuantidadeProps) {

  // Use o estado interno apenas se as props não forem fornecidas
  const [internalQuantity, setInternalQuantity] = useState(quantity ?? 1);
  const displayQuantity = quantity !== undefined ? quantity : internalQuantity;

  function handleIncrease() {
    // Chama a função da prop se ela existir, caso contrário, usa o estado interno
    if (onIncrease) {
      onIncrease();
    } else {
      setInternalQuantity((prevQuantity) => prevQuantity + 1);
    }
  }

  function handleDecrease() {
    // Chama a função da prop se ela existir, caso contrário, usa o estado interno
    if (onDecrease) {
      onDecrease();
    } else if (internalQuantity > 1) {
      setInternalQuantity((prevQuantity) => prevQuantity - 1);
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
        <p>{displayQuantity}</p>
        <img onClick={handleIncrease} src={btnAdd} alt="Botão de adição" />
      </div>
    </div>
  );
}