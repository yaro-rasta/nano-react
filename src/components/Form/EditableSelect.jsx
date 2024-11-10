import PropTypes from "prop-types";
import EditableBase from "./EditableBase";

const ViewComponent = ({ value, onClick }) => (
  <div className="flex items-center w-full" onClick={onClick}>
    <span>{value}</span>
  </div>
);
ViewComponent.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const EditComponent = ({ id, name, value, onChange, options }) => (
  <div className="flex items-center w-full">
    <select
      id={id}
      name={name}
      value={value}
      className="border rounded p-2 w-full"
      onChange={(e) => {
        console.log("Selected value:", e.target.value);
        onChange(e.target.value);
      }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <span className="ml-2">Days week </span>
  </div>
);

EditComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const EditableSelect = (props) => (
  <EditableBase
    {...props}
    viewComponent={ViewComponent}
    editComponent={EditComponent}
  />
);

EditableSelect.displayName = "EditableSelect";

EditableSelect.propTypes = {
  ...EditableBase.propTypes,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EditableSelect;
