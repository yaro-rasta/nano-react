import { useDBState } from "../../state/IndexedDB";

function EditableWeekday({ label }) {
  const [selectedDays, setSelectedDays] = useDBState("selectedDays", []);

  const daysOfWeek = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const handleChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedDays(selectedOptions);
  };

  return (
    <div>
      {label && (
        <label htmlFor="weekdays" className="block">
          {label}
        </label>
      )}{" "}
      {/* Відображаємо label */}
      <select
        id="weekdays"
        name="weekdays"
        multiple
        value={selectedDays}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        {daysOfWeek.map((day) => (
          <option key={day.value} value={day.value}>
            {day.label}
          </option>
        ))}
      </select>
      <div>
        <h3>Selected Days:</h3>
        <ul>
          {selectedDays.map((day) => (
            <li key={day}>{day}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EditableWeekday;
