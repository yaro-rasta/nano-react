import { useLSState } from "../..";
import { AppProvider } from "../../context/AppContext";
import EditableString from "./EditableString";
import EditableNumber from "./EditableNumber";
import EditableAmount from "./EditableAmount";
import { useDBState } from "../../state/IndexedDB";
import EditableTime from "./EditableTime";
import EditableWeekday from "./EditableWeekday";

function FormLayout() {
  const { t } = AppProvider.useAppContext();

  const [textOneLine, setTextOneLine] = useLSState(
    "textOneLine",
    t("textOneLine")
  );
  const [numberValue, setNumberValue] = useLSState("numberValue", 0);
  const [amountValue, setAmountValue] = useLSState("amountValue", 0);

  // Додаємо значення для компонента EditableAmount
  const [currency, setCurrency] = useDBState("currency", {
    amount: 0,
    currency: "USD",
  });

  // Додаємо значення для компонента EditableTime
  const [timeValue, setTimeValue] = useDBState("timeValue", "12:00");

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
        currency={currency.currency}
        setCurrency={(newCurrency) =>
          setCurrency({ ...currency, currency: newCurrency })
        }
        t={t}
      />
      <EditableTime
        id="timeValue"
        name="timeValue"
        label={t("Time")}
        value={timeValue} // Додаємо значення для часу
        onInput={setTimeValue} // Оновлюємо значення при зміні
      />
      <EditableWeekday label={t("Weekday")} />
    </div>
  );
}

export default FormLayout;
