import { useState } from "react";
import styles from "./styles.module.css";
import estrelaCheia from "../../assets/icons/estrelavermelhacheia.png";
import estrelaMetade from "../../assets/icons/estrelavermelhametadeC.png";
import estrelaVazia from "../../assets/icons/estrelavermelhavazia.png";
import setaEsquerda from "../../assets/buttons/btnSetaEsquerda.png";
import setaDireita from "../../assets/buttons/btnSetaDireita.png";
import { useFeedbacks } from "../../hooks/useFeedbacks";

const CaixaFeedback = () => {
  const { feedbacks } = useFeedbacks();

  const filteredFeedbacks = feedbacks.filter((fb) => fb.rating >= 4);

  const [currentIndex, setCurrentIndex] = useState(0);
  const feedbacksPerPage = 3;

  const handleNext = () => {
    const nextIndex = currentIndex + feedbacksPerPage;
    if (nextIndex < filteredFeedbacks.length) {
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    const prevIndex = currentIndex - feedbacksPerPage;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <img key={`full-${i}`} src={estrelaCheia} alt="Estrela completa" />
      );
    }

    if (hasHalfStar) {
      stars.push(<img key="half" src={estrelaMetade} alt="Meia estrela" />);
    }

    const emptyStars = 5 - (fullStars + (hasHalfStar ? 1 : 0));
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <img key={`empty-${i}`} src={estrelaVazia} alt="Estrela vazia" />
      );
    }

    return <div className={styles.estrelas}>{stars}</div>;
  };

  const currentFeedbacks = filteredFeedbacks.slice(
    currentIndex,
    currentIndex + feedbacksPerPage
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Feedbacks</h2>
      <div className={styles.conteudoPrincipal}>
        <div className={styles.navigation}>
          <button
            onClick={handlePrev}
            className={styles.botao}
            disabled={currentIndex === 0}
          >
            <img src={setaEsquerda} alt="Anterior" className={styles.seta} />
          </button>
        </div>
        <div className={styles.cardsGrid}>
          {currentFeedbacks.map((feedback, index) => (
            <div key={currentIndex + index} className={styles.cards}>
              <div className={styles.cardContent}>
                <h3 className={styles.nome}>{feedback.name}</h3>
                {renderStars(feedback.rating)}
                <p className={styles.descricao}>{feedback.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.navigation}>
          <button
            onClick={handleNext}
            className={styles.botao}
            disabled={
              currentIndex + feedbacksPerPage >= filteredFeedbacks.length
            }
          >
            <img src={setaDireita} alt="Próximo" className={styles.seta} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaixaFeedback;
