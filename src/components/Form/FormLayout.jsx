import { useLSState } from "../..";
import { AppProvider } from "../../context/AppContext";
import EditableString from "./EditableString";
import EditableNumber from "./EditableNumber";
import EditableAmount from "./EditableAmount";
import defaultCurrencies from "./currencies";

/**
 * @comment #dev/editable.md
 * # FormLayout Компонент
 *
 * Цей компонент використовує декілька редагованих полів, які зберігаються в локальному сховищі браузера.
 * Компонент дозволяє користувачеві змінювати текстові значення, числові значення та суми з валютою.
 *
 * ## Використання
 *
 * 1. Імпортуйте потрібні компоненти:
 * 
 * ```jsx
 * import { useLSState } from "../..";
 * import { AppProvider } from "../../context/AppContext";
 * import EditableString from "./EditableString";
 * import EditableNumber from "./EditableNumber";
 * import EditableAmount from "./EditableAmount";
 * ```
 *
 * 2. Використовуйте компонент у вашому додатку:
 * 
 * ```jsx
 * function FormLayout() {
 *   const { t } = AppProvider.useAppContext();
 *   const [textOneLine, setTextOneLine] = useLSState("textOneLine", "Text in one line");
 *   const [numberValue, setNumberValue] = useLSState("numberValue", 0);
 *   const [amountValue, setAmountValue] = useLSState("amountValue", 0);
 *   const [currency, setCurrency] = useLSState("currency", "UAH");
 *
 *   return (
 *     <div className="flex flex-col gap-5">
 *       <EditableString
 *         id="textOneLine"
 *         name="textOneLine"
 *         label={t("Name")}
 *         value={textOneLine}
 *         onChange={setTextOneLine}
 *       />
 *       <EditableNumber
 *         id="numberValue"
 *         name="numberValue"
 *         label={t("Number")}
 *         value={numberValue}
 *         onChange={setNumberValue}
 *       />
 *       <EditableAmount
 *         id="amountValue"
 *         name="amountValue"
 *         label={t("Amount")}
 *         value={amountValue}
 *         onChange={setAmountValue}
 *         currency={currency}
 *         setCurrency={setCurrency}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
function FormLayout() {
	const { t } = AppProvider.useAppContext();
	const [textOneLine, setTextOneLine] = useLSState(
		"textOneLine",
		"Text in one line"
	);
	const [numberValue, setNumberValue] = useLSState("numberValue", 0);
	const [amountValue, setAmountValue] = useLSState("amountValue", 0);
	const [currency, setCurrency] = useLSState("currency", defaultCurrencies[0]);

	return (
		<div className="flex flex-col gap-5">
			<EditableString
				id="textOneLine"
				name="textOneLine"
				label="Name"
				// label={t("Name")}
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
				t={t}
			/>
		</div>
	);
}

export default FormLayout;
