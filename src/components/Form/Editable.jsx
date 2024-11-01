import React, { useState } from "react";
import PropTypes from "prop-types";

const Editable = ({ value, onChange, children }) => {
  const [isEditing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          {children}
          <button onClick={handleSave}>Зберегти</button>
        </div>
      ) : (
        <div onClick={handleEdit}>{value}</div>
      )}
    </div>
  );
};

Editable.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Editable;
