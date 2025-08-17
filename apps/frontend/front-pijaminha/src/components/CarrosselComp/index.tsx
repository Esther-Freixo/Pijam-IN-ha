import React, { useState } from 'react';
import setaE from '../../assets/buttons/btnSetaEsquerda.png';
import setaD from '../../assets/buttons/btnSetaDireita.png';
import styles from './styles.module.css';

interface CarrosselProps {
  images: string[];
}

const Carrossel: React.FC<CarrosselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.container}>
      <button className={styles.botaoAnterior} onClick={handlePrev}>
        <div className={styles.conteudoBotao}>
          <div className={styles.circuloSeta}>
            <img src={setaE} alt="Anterior" className={styles.seta} />
          </div>
        </div>
      </button>

      <img
        src={images[currentImageIndex]}
        alt={`Slide ${currentImageIndex + 1}`}
        className={styles.imagem}
      />

      <button className={styles.botaoProximo} onClick={handleNext}>
        <div className={styles.conteudoBotao}>
          <div className={styles.circuloSeta}>
            <img src={setaD} alt="Próximo" className={styles.seta} />
          </div>
        </div>
      </button>
    </div>
  );
};

export default Carrossel;