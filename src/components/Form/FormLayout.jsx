import { useLSState } from "../..";
import { AppProvider } from "../../context/AppContext";
import EditableString from "./EditableString";
import EditableNumber from "./EditableNumber";
import EditableAmount from "./EditableAmount";
import { useDBState } from "../../state/IndexedDB";

function FormLayout() {
  const { t } = AppProvider.useAppContext();

  // Використовуємо useLSState для звичайних значень
  const [textOneLine, setTextOneLine] = useLSState(
    "textOneLine",
    t("textOneLine")
  );
  const [numberValue, setNumberValue] = useLSState("numberValue", 0);
  const [amountValue, setAmountValue] = useLSState("amountValue", 0);

  // Використовуємо useDBState для валют
  const [currency, setCurrency] = useDBState("currency", {
    amount: 0,
    currency: "USD",
  });

  return (
    <div className="flex flex-col gap-5">
      <EditableString
        id="textOneLine"
        name="textOneLine"
        label={t("Name")}
        value={textOneLine}
        onChange={setTextOneLine}
      />
      <EditableNumber
        id="numberValue"
        name="numberValue"
        label={t("Number")}
        value={numberValue}
        onChange={setNumberValue}
      />
      <EditableAmount
        id="amountValue"
        name="amountValue"
        label={t("Amount")}
        value={amountValue}
        onChange={setAmountValue}
        currency={currency.currency} // Передаємо валюту окремо
        setCurrency={(newCurrency) =>
          setCurrency({ ...currency, currency: newCurrency })
        } // Оновлюємо валюту
        t={t}
      />
    </div>
  );
}

export default FormLayout;
