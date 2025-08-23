import HeaderCarrinhoEFavoritos from "../../components/HeaderCarrinhoEFavoritos";
import ProductCardFavorite from "../../components/ProductCardFavorite";
import { usePijamasContext } from "../../hooks/usePijamasContext";
import style from "./style.module.css";
import setaDireita from "../../assets/buttons/btnSetaDireita.png";
import setaEsquerda from "../../assets/buttons/btnSetaEsquerda.png";
import { useEffect, useState } from "react";

export default function Favoritos() {
  const { pijamas } = usePijamasContext();
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1200) setCardsPerView(5);
      else if (window.innerWidth >= 900) setCardsPerView(3);
      else if (window.innerWidth >= 600) setCardsPerView(2);
      else setCardsPerView(1);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setDirection("left");
    setStartIndex((prev) =>
      prev === 0
        ? Math.max(pijamas.length - cardsPerView, 0)
        : prev - cardsPerView
    );
  };

  const handleNext = () => {
    setDirection("right");
    setStartIndex((prev) =>
      prev + cardsPerView >= pijamas.length ? 0 : prev + cardsPerView
    );
  };

  const favoritesPijamas = pijamas.filter((pijama) => pijama.favorite);

  const visiblePijamas = favoritesPijamas.slice(
    startIndex,
    startIndex + cardsPerView
  );

  return (
    <>
      <HeaderCarrinhoEFavoritos
        carrinhoColor={"#A4A8B0"}
        favoriteColor={"#A31621"}
      />
      <section className={style.section}>
        <img onClick={handlePrev} src={setaEsquerda} alt="" />
        <div
          className={`${style.carouselWrapper} ${
            direction === "left"
              ? style.slideLeft
              : direction === "right"
              ? style.slideRight
              : ""
          }`}
          onAnimationEnd={() => setDirection(null)}
        >
          {visiblePijamas.map((pijama) => (
            <ProductCardFavorite key={pijama.id} pijama={pijama} />
          ))}
        </div>
        <img onClick={handleNext} src={setaDireita} alt="" />
      </section>
    </>
  );
}
