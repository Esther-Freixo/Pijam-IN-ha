import { useState } from "react";
import axios from "axios";
import { useCart } from "../../stores/carrinhoContext";
import style from "./styles.module.css";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart } = useCart();
  const [step, setStep] = useState<"dados" | "pagamento" | "sucesso">("dados");
  const [form, setForm] = useState({
    buyer_name: "",
    cpf: "",
    zip_code: "",
    state: "",
    city: "",
    neighborhood: "",
    address: "",
    number: "",
    payment_method: "credit_card",
    installments: 1,
    card_number: "",
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  const validateDados = () => {
    const onlyLetters = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    const onlyNumbers = /^[0-9]+$/;
    const cpfRegex = /^\d{11}$/;
    const cepRegex = /^\d{8}$|^\d{5}-\d{3}$/;

    return (
      onlyLetters.test(form.buyer_name) &&
      cpfRegex.test(form.cpf) &&
      cepRegex.test(form.zip_code) &&
      onlyLetters.test(form.state) &&
      onlyLetters.test(form.city) &&
      onlyLetters.test(form.neighborhood) &&
      onlyNumbers.test(form.number) &&
      form.address.trim() !== ""
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (validateDados()) {
      setStep("pagamento");
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  const handlePurchase = async () => {
  try {
    const finalPrice = form.payment_method === "pix" ? total * 0.85 : total;
    
    const pajamasPayload = cart.map((item) => ({
      pajamaId: String(item.id), 
      size: item.size,           
      quantity: item.quantity,
      price: item.price,        
    }));

    await axios.post("http://localhost:3333/sales", {
      buyer_name: form.buyer_name,
      cpf: form.cpf,
      price: finalPrice,
      payment_method: form.payment_method,
      installments: form.payment_method === "credit_card" ? form.installments : 1,
      card_number: form.payment_method === "credit_card" ? form.card_number : null,
      address: {
        zip_code: form.zip_code,
        state: form.state,
        city: form.city,
        neighborhood: form.neighborhood,
        address: form.address,
        number: form.number,
      },
      pajamas: pajamasPayload,
    });

    setStep("sucesso");
  } catch (error) {
    console.error(error);
    alert("Erro ao finalizar compra!");
  }
};
  return (
    <div className={style.modalOverlay}>
           {" "}
      <div className={style.modal}>
               {" "}
        {step === "dados" && (
          <>
                        <h2>Dados</h2>
                       {" "}
            <input
              type="text"
              name="buyer_name"
              placeholder="Nome completo"
              value={form.buyer_name}
              onChange={handleChange}
              required
            />
                       {" "}
            <input
              type="text"
              name="cpf"
              placeholder="CPF (somente números)"
              value={form.cpf}
              onChange={handleChange}
              required
            />
                       {" "}
            <input
              type="text"
              name="zip_code"
              placeholder="CEP"
              value={form.zip_code}
              onChange={handleChange}
              required
            />
                       {" "}
            <input
              type="text"
              name="address"
              placeholder="Logradouro"
              value={form.address}
              onChange={handleChange}
              required
            />
                       {" "}
            <div className={style.inlineInputs}>
                           {" "}
              <input
                type="text"
                name="state"
                placeholder="UF"
                value={form.state}
                onChange={handleChange}
                required
              />
                           {" "}
              <input
                type="text"
                name="city"
                placeholder="Cidade"
                value={form.city}
                onChange={handleChange}
                required
              />
                         {" "}
            </div>
                       {" "}
            <div className={style.inlineInputs}>
                           {" "}
              <input
                type="text"
                name="number"
                placeholder="Número"
                value={form.number}
                onChange={handleChange}
                required
              />
                           {" "}
              <input
                type="text"
                name="neighborhood"
                placeholder="Bairro"
                value={form.neighborhood}
                onChange={handleChange}
                required
              />
                         {" "}
            </div>
                        <button onClick={handleNext}>ENVIAR</button>         {" "}
          </>
        )}
               {" "}
        {step === "pagamento" && (
          <>
                        <h2>Pagamento</h2>           {" "}
            <select
              name="payment_method"
              value={form.payment_method}
              onChange={handleChange}
            >
                           {" "}
              <option value="credit_card">Cartão de crédito</option>           
                <option value="pix">PIX (-15%)</option>           {" "}
            </select>
                       {" "}
            {form.payment_method === "credit_card" && (
              <>
                               {" "}
                <select
                  name="installments"
                  value={form.installments}
                  onChange={handleChange}
                >
                                   {" "}
                  {[...Array(6)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                                            Parcelamento x{i + 1}               
                         {" "}
                    </option>
                  ))}
                                 {" "}
                </select>
                               {" "}
                <input
                  type="text"
                  name="card_number"
                  placeholder="Número do cartão"
                  value={form.card_number}
                  onChange={handleChange}
                  required
                />
                             {" "}
              </>
            )}
                       {" "}
            <div className={style.actions}>
                           {" "}
              <button onClick={() => setStep("dados")}>VOLTAR</button>         
                  <button onClick={handlePurchase}>ENVIAR</button>           {" "}
            </div>
                     {" "}
          </>
        )}
               {" "}
        {step === "sucesso" && (
          <div className={style.sucesso}>
                        <h2>Sua compra foi concluída!</h2>           {" "}
            <p>Obrigado por comprar conosco!</p>           {" "}
            <button onClick={onClose}>Fechar</button>         {" "}
          </div>
        )}
             {" "}
      </div>
         {" "}
    </div>
  );
}
