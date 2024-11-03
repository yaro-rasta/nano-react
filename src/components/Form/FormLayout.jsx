import { useLSState } from "../..";
import { AppProvider } from "../../context/AppContext";
import EditableString from "./EditableString";
import EditableNumber from "./EditableNumber";
import EditableAmount from "./EditableAmount ";

function FormLayout() {
  const { t } = AppProvider.useAppContext();
  const [textOneLine, setTextOneLine] = useLSState(
    "textOneLine",
    "Text in one line"
  );
  const [numberValue, setNumberValue] = useLSState("numberValue", 0);
  const [amountValue, setAmountValue] = useLSState("amountValue", 0);
  const [currency, setCurrency] = useLSState("currency", "UAH");

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
        currency={currency}
        setCurrency={setCurrency}
      />
    </div>
  );
}

export default FormLayout;
