// src/Pages/Carrinho/index.tsx

import { useState } from "react"; // Adicione useState aqui
import { useCart } from "../../stores/carrinhoContext";
import CartItem from "../../components/CardItem";
import style from "./style.module.css";
import CheckoutModal from "../../components/Modal"; // Importe o modal

export default function Carrinho() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false); // Novo estado para o modal

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <section className={style.cartPage}>
        {cart.length === 0 ? (
          <p></p>
        ) : (
          <>
            <div className={style.cartList}>
              {cart.map((item) => (
                <CartItem
                  key={`${item.id}-${item.size}`}
                  item={item}
                  onIncrease={() => increaseQuantity(item.id, item.size)}
                  onDecrease={() => decreaseQuantity(item.id, item.size)}
                  onRemove={() => removeFromCart(item.id, item.size)}
                />
              ))}
            </div>

            <div className={style.cartSummary}>
              <p>
                Total:{" "}
                <strong>
                  R$ {total.toFixed(2).toString().replace(".", ",")}
                </strong>
              </p>
              <button
                className={style.checkoutButton}
                onClick={handleOpenModal}
                 style={{ cursor: "pointer" }}
              >
                COMPRE TUDO
              </button>
            </div>
          </>
        )}
      </section>

      <CheckoutModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}