import { useState, useEffect } from "react";
import Editable from "./Editable";

const EditableAmount = ({ currency, currenciesList, onChange }) => {
  
  const [amount, setAmount] = useState(() => {
    const savedAmount = localStorage.getItem("amount");
    return savedAmount ? Number(savedAmount) : 0; 
  });

  /
  useEffect(() => {
    localStorage.setItem("amount", amount);
  }, [amount]);

  const handleCurrencyChange = (newCurrency) => {
    onChange(amount, newCurrency);
  };

  return (
    <Editable value={`${amount} ${currency}`} onChange={handleCurrencyChange}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select onChange={(e) => handleCurrencyChange(e.target.value)}>
        {currenciesList.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </Editable>
  );
};

export default EditableAmount;
