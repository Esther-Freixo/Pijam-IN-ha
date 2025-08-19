import { useState } from "react";
import Tamanho, { type Size } from "../../components/Tamanho";

export default function Pijama() {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const sizes: Size[] = ["PP", "P", "M", "G", "GG"];
  return (
    <>
      <h1>Pijama</h1>
      {sizes.map((size) => (
        <Tamanho
          key={size}
          size={size}
          isSelected={selectedSize === size}
          onClick={() => setSelectedSize(size)}
        />
      ))}
    </>
  );
}
