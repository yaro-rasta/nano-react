import PropTypes from "prop-types";
import EditableBase from "./EditableBase";
import { useDBState } from "../../state/IndexedDB";
import defaultCurrencies from "./currencies";

// Компонент перегляду (для відображення значення)
const ViewComponent = ({
  value,
  label,
  showLabel,
  onClick,
  currency,
  t = (v) => v,
}) => (
  <div className="flex items-center w-full" onClick={onClick}>
    {showLabel && label && <label className="mr-2">{t(label)}</label>}
    <span>{`${value} ${currency.char}`}</span>
  </div>
);

ViewComponent.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  onClick: PropTypes.func,
  currency: PropTypes.shape({
    code: PropTypes.string.isRequired,
    char: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  t: PropTypes.func,
};

// Компонент редагування (для вводу значення)
const EditComponent = ({
  id,
  name,
  value,
  label,
  showLabel,
  onInput,
  currency,
  onCurrencyChange,
  currencies,
  t = (v) => v,
}) => {
  return (
    <div className="flex items-center w-full">
      {showLabel && label && (
        <label htmlFor={id} className="mr-2">
          {label}
        </label>
      )}
      <input
        type="number"
        id={id}
        name={name}
        value={value}
        className="border rounded p-2 w-full"
        onInput={onInput}
      />
      <select
        value={currency.code}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="ml-2 border rounded p-2"
      >
        {currencies.map((curr) => (
          <option key={curr.code} value={curr.code}>
            {t(curr.title)}
          </option>
        ))}
      </select>
    </div>
  );
};

EditComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  onInput: PropTypes.func.isRequired,
  currency: PropTypes.shape({
    code: PropTypes.string.isRequired,
    char: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      char: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  t: PropTypes.func,
};

// Основний компонент EditableAmount
const EditableAmount = ({
  currencies = defaultCurrencies,
  currency,
  setCurrency,
  t = (v) => v,
  ...props
}) => {
  const [value, setValue] = useDBState(props.value, props.value); // Використовуємо хук для збереження значення в IndexedDB

  const handleCurrencyChange = (code) => {
    const selectedCurrency = currencies.find((curr) => curr.code === code);
    setCurrency(selectedCurrency); // Оновлюємо валюту
  };

  const handleInput = (e) => {
    const newValue = e.target.value;
    setValue(newValue); // Оновлюємо значення
  };

  return (
    <EditableBase
      {...props}
      value={value}
      viewComponent={(viewProps) => (
        <ViewComponent {...viewProps} currency={currency} t={t} />
      )}
      editComponent={(editProps) => (
        <EditComponent
          {...editProps}
          currency={currency}
          onCurrencyChange={handleCurrencyChange}
          currencies={currencies}
          t={t}
          onInput={handleInput}
        />
      )}
    />
  );
};

EditableAmount.displayName = "EditableAmount";

EditableAmount.propTypes = {
  ...EditableBase.propTypes,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currency: PropTypes.shape({
    code: PropTypes.string.isRequired,
    char: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      char: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  t: PropTypes.func,
};

export default EditableAmount;
