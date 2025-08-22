import { useCart } from "../../stores/carrinhoContext";
import CartItem from "../../components/CardItem";
import style from "./style.module.css";

export default function Carrinho() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className={style.cartPage}>
      <h2>Meu Carrinho</h2>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
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
            <button className={style.checkoutButton}>Finalizar Compra</button>
          </div>
        </>
      )}
    </section>
  );
}