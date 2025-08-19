import style from "./style.module.css";

export type Size = "PP" | "P" | "M" | "G" | "GG";

interface TamanhoProps {
  size: Size;
  isSelected: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Tamanho({
  size,
  isSelected = false,
  onClick,
  disabled = false,
}: TamanhoProps) {
  return (
    <>
      <button
        className={`${style.button} ${isSelected ? style.selected : ""}`}
        onClick={onClick}
        disabled={disabled}
      >
        {size}
      </button>
    </>
  );
}
