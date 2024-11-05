import { useState, useEffect } from "react";
import Editable from "./Editable";

/**
 * Компонент EditableAmount дозволяє редагувати суму та вибрати валюту з наданого списку.
 * Зберігає значення суми в localStorage, що дозволяє відновити значення після перезавантаження сторінки.
 * @todo описати покроково як має працювати компонент.
 *
 * @component
 * @param {Object} props - Об'єкт властивостей компонента.
 * @param {string} props.currency - Поточна валюта.
 * @param {Array<string>} props.currenciesList - Масив доступних валют для вибору.
 * @param {function} props.onSave - Функція, яка викликається при збереженні нової валюти.
 *
 * @example
 * return (
 *   <EditableAmount currency="USD" currenciesList={["USD", "UAH", "RUB"]} onSave={(amount, currency) => console.log(amount, currency)} />
 * )
 *
 * @returns {JSX.Element} Рендерить поле для вводу суми та випадаючий список валют.
 */
const EditableAmount = ({ currency, currenciesList, onSave }) => {
  // Ініціалізуємо стан із значення з localStorage або встановлюємо за замовчуванням 0
//   @todo для зберігання даних у localStorage використовується useLSState()
  const [amount, setAmount] = useState(() => {
    const savedAmount = localStorage.getItem("amount");
    return savedAmount ? Number(savedAmount) : 0;
  });

  // Зберігаємо значення amount у localStorage при його зміні
  useEffect(() => {
    localStorage.setItem("amount", amount);
  }, [amount]);

  const handleCurrencyChange = (newCurrency) => {
    onSave(newCurrency);
  };

  return (
    <Editable value={`${amount} ${currency}`} onChange={handleCurrencyChange}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        value={currency}
        onChange={(e) => handleCurrencyChange(e.target.value)}
      >
        {currenciesList.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </Editable>
  );
};

// @todo додати propTypes.

export default EditableAmount;
