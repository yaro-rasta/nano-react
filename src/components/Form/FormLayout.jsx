import React, { useState } from "react";
import EditableAmount from "./EditableAmount";

function FormLayout() {
  const currenciesList = ["USD", "UAH", "RUB"];
  const [currency, setCurrency] = useState("USD");

  const handleAmountChange = (amount, newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <>
      Form layout here
      <EditableAmount
        currency={currency}
        currenciesList={currenciesList}
        onChange={handleAmountChange}
      />
    </>
  );
}

export default FormLayout;
