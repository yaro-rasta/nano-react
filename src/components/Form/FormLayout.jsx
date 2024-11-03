import { useState } from "react";
import EditableAmount from "./EditableAmount";

/**
 * Компонент FormLayout дозволяє вибрати валюту та суму для збереження.
 * Валюта зберігається в локальному сховищі, що дозволяє зберегти обраний користувачем параметр між оновленнями сторінки.
 *
 * @component
 * @example
 * return (
 *   <FormLayout />
 * )
 *
 * @returns {JSX.Element} Рендерить форму для вибору валюти та суми.
 */
function FormLayout() {
  const currenciesList = ["USD", "UAH", "RUB"];

  // Стан для збереження обраної валюти з localStorage
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "USD";
  });

  /**
   * Зберігає обрану валюту як у стані, так і в localStorage.
   *
   * @param {string} newCurrency - Валюта, яку обрав користувач.
   */
  const handleSaveCurrency = (newCurrency) => {
    localStorage.setItem("currency", newCurrency);
    setCurrency(newCurrency);
  };

  return (
    <>
      Form layout here
      <EditableAmount
        currency={currency}
        currenciesList={currenciesList}
        onSave={handleSaveCurrency}
      />
    </>
  );
}

export default FormLayout;
