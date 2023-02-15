import React from "react";

const TableRow = ({ data, handleRemoveProduct, handleUpdateProduct }) => {
  return (
    <tr>
      <td>
        <div className="product">
          <img src="https://picsum.photos/100/120" alt="" />
          <div className="info">
            <div className="name">{data.name}</div>
            <div className="category">{data.description}</div>
          </div>
        </div>
      </td>
      <td>R$ {data.value}</td>
      <td>
        <div className="qty">
          <button
            onClick={() => {
              handleUpdateProduct(data, "LessProd");
            }}
          >
            <i className="bx bx-minus"></i>
          </button>
          <span>{data.quantity}</span>
          <button
            onClick={() => {
              handleUpdateProduct(data, "AddProd");
            }}
          >
            <i className="bx bx-plus"></i>
          </button>
        </div>
      </td>
      <td>R$ {data.value * data.quantity}</td>
      <td>
        <button
          className="remove"
          onClick={() => {
            handleRemoveProduct(data);
          }}
        >
          <i className="bx bx-x"></i>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
