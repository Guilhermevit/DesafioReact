/*
? DESAFIO - Shopping Cart:

Você deve desenvolver um carrinho de compras funcional.
Funcionalidades que esperamos que você desenvolva:

todo - inserção de novos produtos no carrinho
todo - remoção de produtos já inseridos
todo - alteração de quantidade de cada item 
todo - cálculo do preço total dos itens inseridos

todo - FUNCIONALIDADE EXTRA: aplicação de cupom de desconto
*/

import "./styles.scss";
import PageHeader from "./layout/PageHeader";
import PageTitle from "./layout/PageTitle";
import Summary from "./Summary";
import TableRow from "./TableRow";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { apiService } from "./ApiService/Api.service";
import { useState, useEffect } from "react";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

function Number(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function App() {
  const [car, setCar] = useState([]);

  const FormatArrays = {
    name: "Monitor",
    description: "Monitor Acer " + Number(21, 45) + " Pol.",
    value: Number(500, 10000),
    quantity: 1,
  };
  const ReadData = () => {
    apiService.get("/").then((response) => setCar(response.data));
  };
  useEffect(() => {
    ReadData();
  }, []);

  const handleAddProduct = () => {
    apiService.post("/", FormatArrays).then((response) => {
      ReadData();
    });
  };
  const handleRemoveProduct = (item) => {
    apiService.delete(`/${item._id}`).then((response) => {
      ReadData();
    });
  };
  const handleUpdateProduct = (item, change) => {
    let newQuantity = item.quantity;
    if (change === "AddProd") {
      newQuantity += 1;
    }
    if (change === "LessProd") {
      if (newQuantity === 1) {
        return;
      }
      newQuantity -= 1;
    }
    const newRead = { ...item, quantity: newQuantity };
    delete newRead._id;
    apiService.put(`/${item._id}`, newRead).then((response) => {
      ReadData();
    });
  };
  const getSubTotal = () => {
    let sum = 0;
    for (let item of car) {
      sum += item.value * item.quantity;
    }
    return sum;
  };
  const Subtotal = getSubTotal();

  return (
    <>
      <PageHeader />
      <main>
        <PageTitle data={"Seu carrinho"} />
        <div className="content">
          <section>
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {car.map((item) => (
                  <TableRow
                    key={item._id}
                    data={item}
                    handleRemoveProduct={handleRemoveProduct}
                    handleUpdateProduct={handleUpdateProduct}
                  />
                ))}
                {car.length === 0 && (
                  <tr>
                    <td colSpan="5" align="center">
                      <b>
                        <AddShoppingCartIcon fontSize="medium" />
                        <p /> Seu carrinho de compras está vazio
                      </b>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div
              className="add-product"
              onClick={handleAddProduct}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </div>
          </section>
          <aside>
            <Summary Subtotal={Subtotal} />
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
