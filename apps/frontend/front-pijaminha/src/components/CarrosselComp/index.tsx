import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './styles.module.css';

interface CarrosselProps {
  images: string[];
}

const Carrossel: React.FC<CarrosselProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,          // autoplay ativado
    autoplaySpeed: 3000,     // troca a cada 3s
    pauseOnHover: true,      // pausa no hover
    pauseOnFocus: true,      // pausa no foco
    cssEase: "ease-in-out",  // transição mais suave
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className={styles.imagem}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carrossel;
