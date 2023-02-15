import React, { useState } from "react";

const Summary = ({ Subtotal }) => {
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isDiscountValid, setIsDiscountValid] = useState(false);
  const [isCodeApplied, setIsCodeApplied] = useState(false);
  const [appliedCode, setAppliedCode] = useState("");
  const [showTextBox, setShowTextBox] = useState(false);

  const handleApplyCode = () => {
    if (discountCode === "desconto") {
      setDiscountAmount(Subtotal * 0.05);
      setIsDiscountValid(true);
      setIsCodeApplied(true);
    } else {
      setIsDiscountValid(false);
      setIsCodeApplied(true);
    }
  };

  const finalTotal = (Subtotal - discountAmount).toFixed(2);

  const handleCheckoutClick = () => {
    alert(`Sua compra foi efetuada com sucesso no valor de R$${finalTotal}`);
  };

  return (
    <>
      <div className="box">
        <header>Resumo da compra</header>
        <div className="info">
          <div>
            <span>Sub-total</span>
            <span>R$ {Subtotal}</span>
          </div>
          <div>
            <span>Frete</span>
            <span>Gratuito</span>
          </div>
          <div>
            {!showTextBox && (
              <button onClick={() => setShowTextBox(true)}>
                Adicionar cupom de desconto
                <i className="bx bx-right-arrow-alt"></i>
              </button>
            )}
            {showTextBox && (
              <div>
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button onClick={handleApplyCode}>Aplicar</button>
              </div>
            )}
            {isCodeApplied && isDiscountValid && (
              <p>
                Parabéns! Você ganhou 5% de desconto com o cupom {appliedCode}.
              </p>
            )}
            {isCodeApplied && !isDiscountValid && (
              <p>
                Desculpe, o código de desconto {appliedCode} é inválido ou já
                foi utilizado.
              </p>
            )}
          </div>
        </div>
        <footer>
          <span>Total</span>
          <span>R$ {finalTotal}</span>
        </footer>
      </div>
      <button onClick={handleCheckoutClick}>Finalizar Compra</button>
    </>
  );
};

export default Summary;
