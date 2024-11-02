import EditableBase from './EditableBase'
import PropTypes from 'prop-types'

const ViewComponent = ({ value, label, showLabel, onClick }) => (
	<div className="flex items-center" onClick={onClick}>
		{showLabel && label && <label className="mr-2">{label}</label>}
		<span>{value}</span>
	</div>
)
ViewComponent.propTypes = {
	value: PropTypes.string.isRequired,
	label: PropTypes.string,
	showLabel: PropTypes.bool,
	onClick: PropTypes.func,
}

const EditComponent = ({ id, name, value, label, showLabel, onInput }) => (
	<div className="flex items-center">
		{showLabel && label && <label htmlFor={id} className="mr-2">{label}</label>}
		<input
			type="text"
			id={id}
			name={name}
			value={value}
			className="border rounded p-2 w-full"
			onInput={onInput}
		/>
	</div>
)
EditComponent.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string,
	showLabel: PropTypes.bool,
	onInput: PropTypes.func.isRequired,
	// onChange: PropTypes.func.isRequired,
}

/**
 * EditableString component that extends EditableBase for single-line text input.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.value - The initial value of the input.
 * @param {function} props.onChange - Callback function called when the value changes.
 * @param {string} props.name - The name attribute for the input element.
 * @param {string} props.id - The id attribute for the input element.
 * @param {string} props.label - Label text to display alongside the input.
 * @param {boolean} [props.labelInView=true] - Whether to display the label in view mode.
 * @param {boolean} [props.labelInEdit=true] - Whether to display the label in edit mode.
 * @param {string} [props.size=''] - The size of the input element (e.g., 'lg', 'sm').
 * @param {number} [props.tabIndex=0] - Tab index for the input group.
 * @returns {JSX.Element} The rendered EditableString component.
 */
const EditableString = (props) => (
	<EditableBase {...props} viewComponent={ViewComponent} editComponent={EditComponent} />
)

// Set a display name to avoid the ESLint warning
EditableString.displayName = 'EditableString'

EditableString.propTypes = {
	...EditableBase.propTypes,
	value: PropTypes.string.isRequired, // Ensured 'value' is always a string
}

export default EditableString