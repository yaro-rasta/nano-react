import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const EditableNumber = ({ id, name, label, value, onChange }) => {
  const [editValue, setEditMode] = useState(false);
  const { t } = useTranslation();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditMode(false);
    } else if (e.key === "Escape") {
      setEditMode(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id}>{t(label)}</label>
      <input
        type="number"
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onKeyDown={handleKeyDown}
        className="border rounded p-2"
      />
    </div>
  );
};

EditableNumber.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default EditableNumber;
