import { useTheme } from "../../context/ThemeContext";
import PropTypes from "prop-types"
import EditableBase from "./EditableBase"

const EditComponent = ({ id, name, value, label, showLabel, onChange, options }) => {
	const theme = useTheme();
	return (
		<div className={theme.editContainer}>
			{showLabel && label && (
				<label htmlFor={id} className={theme.editLabel || theme.label}>
					{label}
				</label>
			)}
			<select
				id={id}
				name={name}
				value={value}
				className={theme.select}
				//   @todo відсутній атрибут mupltiple=true
				onChange={(e) => {
					console.debug("Changed value:", e.target.value);
					onChange(e.target.value);
				}}
			>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}

EditComponent.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string,
	showLabel: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const EditableSelect = (props) => (
	<EditableBase
		{...props}
		editComponent={EditComponent}
	/>
)

EditableSelect.displayName = "EditableSelect"

EditableSelect.propTypes = {
	...EditableBase.propTypes,
	value: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default EditableSelect
