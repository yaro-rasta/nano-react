import PropTypes from "prop-types";
import EditableBase from "./EditableBase";

const ViewComponent = ({ value, label, showLabel, onClick, currency }) => (
  <div className="flex items-center w-full" onClick={onClick}>
    {showLabel && label && <label className="mr-2">{label}</label>}
    <span>{`${value} ${currency}`}</span>
  </div>
);

ViewComponent.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  onClick: PropTypes.func,
  currency: PropTypes.string,
};

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
}) => (
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
      value={currency}
      onChange={onCurrencyChange}
      className="ml-2 border rounded p-2"
    >
      {currencies.map((curr) => (
        <option key={curr} value={curr}>
          {curr}
        </option>
      ))}
    </select>
  </div>
);

EditComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  onInput: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const EditableAmount = ({
  currencies = ["$", "€", "UAH"],
  currency,
  setCurrency,
  ...props
}) => {
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <EditableBase
      {...props}
      viewComponent={(viewProps) => (
        <ViewComponent {...viewProps} currency={currency} />
      )}
      editComponent={(editProps) => (
        <EditComponent
          {...editProps}
          currency={currency}
          onCurrencyChange={handleCurrencyChange}
          currencies={currencies}
        />
      )}
    />
  );
};

EditableAmount.displayName = "EditableAmount";

EditableAmount.propTypes = {
  ...EditableBase.propTypes,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currency: PropTypes.string,
  currencies: PropTypes.arrayOf(PropTypes.string),
};

export default EditableAmount;
