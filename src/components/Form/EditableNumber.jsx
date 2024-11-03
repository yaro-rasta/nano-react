import PropTypes from "prop-types";
import EditableBase from "./EditableBase";

const ViewComponent = ({ value, label, showLabel, onClick }) => (
  <div className="flex items-center w-full" onClick={onClick}>
    {showLabel && label && <label className="mr-2">{label}</label>}
    <span>{value}</span>
  </div>
);

ViewComponent.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  onClick: PropTypes.func,
};

const EditComponent = ({ id, name, value, label, showLabel, onInput }) => (
  <div className="flex items-center ">
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
  </div>
);

EditComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  onInput: PropTypes.func.isRequired,
};

const EditableNumber = (props) => (
  <EditableBase
    {...props}
    viewComponent={ViewComponent}
    editComponent={EditComponent}
  />
);

EditableNumber.displayName = "EditableNumber";

EditableNumber.propTypes = {
  ...EditableBase.propTypes,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default EditableNumber;
