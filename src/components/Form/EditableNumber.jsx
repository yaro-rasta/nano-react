const EditableNumber = ({ value, onChange }) => {
  return (
    <select defaultValue={value} onChange={(e) => onChange(e.target.value)}>
      <option value="USD">Долари (USD)</option>
      <option value="UAH">Гривні (UAH)</option>
      <option value="RUB">Рублі (RUB)</option>
    </select>
  );
};

export default EditableNumber;
