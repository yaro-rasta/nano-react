import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { handleKeyPress } from "./utils";

/**
 * @comment #dev/editable.md
 * # EditableBase Component Documentation
 *
 * ## Overview
 * The `EditableBase` component provides a flexible and customizable interface for switching between view and edit modes for an input field. This component is useful for scenarios where users need to view a value and then edit it seamlessly, offering various options for customization and behavior.
 *
 * ## Props
 *
 * ### Required Props
 * - **`value`** (`string | number`): The initial value to display in view mode and edit in edit mode. This is the core data that will be manipulated.
 * - **`name`** (`string`): The name attribute of the input field. This is used for identification and form submission purposes.
 *
 * ### Optional Props
 * - **`id`** (`string`): The unique identifier for the input field. Useful for DOM selection or accessibility.
 * - **`onChange`** (`function`): A callback function triggered when the value is changed and saved. The new value is passed as an argument. Default: `() => true`.
 * - **`onInput`** (`function`): A callback function triggered on every keystroke or input change, allowing for real-time value updates. Default: `() => true`.
 * - **`onCancel`** (`function`): A callback function triggered when the edit mode is canceled, reverting to the original value. Default: `() => true`.
 * - **`mode`** (`'view' | 'edit'`): The initial mode of the component, either `view` or `edit`. Default: `'view'`.
 * - **`label`** (`string`): A text label associated with the input field, displayed in either view or edit mode based on configuration.
 * - **`labelInView`** (`boolean`): Whether to show the label in view mode. Default: `true`.
 * - **`labelInEdit`** (`boolean`): Whether to show the label in edit mode. Default: `true`.
 * - **`size`** (`string`): Adjusts the size of the text, e.g., `lg` for large or `sm` for small. Default: `''` (normal size).
 * - **`tabIndex`** (`number`): The tab index for keyboard navigation. Default: `0`.
 * - **`editComponent`** (`React.ComponentType`): A custom component to render in edit mode, receiving props such as `id`, `name`, `value`, and handlers.
 * - **`viewComponent`** (`React.ComponentType`): A custom component to render in view mode, receiving similar props as `editComponent`.
 * - **`config`** (`object`): Configuration object with properties:
 *   - **`revertOnEscape`** (`boolean`): If `true`, reverts the value to the original when the Escape key is pressed. Default: `true`.
 *   - **`clickOutsideToSave`** (`boolean`): If `true`, clicking outside the input field saves the current value and exits edit mode. Default: `true`.
 *
 * ### Additional Props
 * - **`rest`**: Additional props that are spread onto the input element.
 *
 * ## Functionality
 *
 * ### Modes of Operation
 * 1. **View Mode**: Displays the value in a read-only format. The label is optionally shown, and the component is focusable for user interaction.
 * 2. **Edit Mode**: Transforms into an editable input field where the user can modify the value. The label can also be shown if `labelInEdit` is `true`.
 *
 * ### Core Functions
 * - **handleCancel**: Reverts the input to the original value, exits edit mode, and calls `onCancel`.
 * - **handleChange**: Saves the updated value, calls `onChange`, and exits edit mode.
 * - **handleInput**: Updates the internal state (`isolated`) as the user types and calls `onInput`.
 * - **handleViewClick**: Switches from view mode to edit mode when the view element is clicked.
 * - **handleEditKeyDown**: Manages keyboard interactions, supporting Enter to save and Escape to cancel.
 *
 * ### Lifecycle Hooks (Step-by-step Testing Guide)
 *
 * 1. **Initial Render**
 *    - Ensure the component renders in the correct mode (`view` or `edit`) based on the `mode` prop.
 *    - Verify that the `value` is correctly displayed in view mode and that the appropriate elements (label and input) are rendered according to `labelInView` and `labelInEdit`.
 *
 * 2. **Switching to Edit Mode**
 *    - Click on the view element or focus on it using the `tabIndex` to trigger `handleViewClick`.
 *    - Confirm that `editMode` is set to `'edit'` and that the input element receives focus.
 *    - Check if the `originalValue` is saved before entering edit mode.
 *    - If a custom `editComponent` is provided, ensure it is rendered correctly with the appropriate props.
 *
 * 3. **Editing the Value**
 *    - Start typing in the input field and verify that `handleInput` updates the `isolated` state with the new value.
 *    - Check that `onInput` is called with the correct value.
 *    - Ensure that the component remains in edit mode as long as the user is interacting with the input.
 *
 * 4. **Saving the Value**
 *    - Press the `Enter` key or click outside the component (if `clickOutsideToSave` is enabled) to trigger `handleChange`.
 *    - Verify that `handleChange` is called with the correct updated value.
 *    - Ensure `onChange` is called and `editMode` switches back to `'view'`.
 *    - Confirm that the new value is displayed in view mode.
 *
 * 5. **Canceling Edit Mode**
 *    - Press the `Escape` key to trigger `handleCancel`.
 *    - Check that `handleCancel` reverts the `isolated` state to `originalValue`.
 *    - Ensure `onCancel` is called and `editMode` switches back to `'view'`.
 *    - Verify that the original value is displayed in view mode.
 *
 * 6. **Focus Management**
 *    - On entering edit mode, ensure that the input element is focused using the `useEffect` hook.
 *    - Check that the component correctly handles focus when switching between modes.
 *
 * 7. **Click Outside to Save**
 *    - If `clickOutsideToSave` is `true`, click anywhere outside the component to test if the value is saved.
 *    - Verify that `handleClickOutside` correctly detects the outside click and triggers `handleChange` or switches to view mode without saving (based on configuration).
 *
 * 8. **Unmounting**
 *    - Ensure that all event listeners (e.g., `mousedown`, `touchstart`) added by `useEffect` are properly removed when the component is unmounted.
 *    - Test this by dynamically removing the component from the DOM and checking for memory leaks or lingering event listeners.
 *
 * ### Testing Checklist
 * - [ ] Component initializes correctly in `view` or `edit` mode.
 * - [ ] Clicking the view element switches to edit mode and focuses the input.
 * - [ ] Typing in the input updates the state and calls `onInput`.
 * - [ ] Pressing `Enter` saves the value, switches to view mode, and calls `onChange`.
 * - [ ] Pressing `Escape` cancels the edit, reverts to the original value, and calls `onCancel`.
 * - [ ] Clicking outside the component saves the value if `clickOutsideToSave` is enabled.
 * - [ ] Event listeners are cleaned up when the component is unmounted.
 * - [ ] Custom components (`editComponent` and `viewComponent`) receive the correct props.
 *
 * ## Usage Example
 * ```jsx
 * import EditableBase from './EditableBase'
 *
 * const MyComponent = () => {
 *   const [value, setValue] = useState('Sample Text')
 *
 *   return (
 *     <EditableBase
 *       id="editable-field"
 *       name="editable"
 *       value={value}
 *       onChange={(newValue) => setValue(newValue)}
 *       label="Edit Me"
 *       size="lg"
 *       config={{ clickOutsideToSave: true, revertOnEscape: true }}
 *     />
 *   )
 * }
 * ```
 *
 * ## Notes
 * - **Customization**: You can provide custom components for both view and edit modes, making the component highly flexible.
 * - **Keyboard Accessibility**: The component handles key events for accessibility and improved user experience.
 * - **Event Listeners**: The component listens for clicks outside the input to handle save actions, improving user interaction flow.
 */

/**
 * @typedef {Object} Config
 * @property {boolean} [revertOnEscape=true] - If true, reverts the value to the original when the Escape key is pressed.
 * @property {boolean} [clickOutsideToSave=true] - If true, clicking outside the input saves the current value and exits edit mode.
 */

/**
 * @typedef {Object} EditableBaseProps
 * @property {string | number} value - The initial value for the component.
 * @property {string} name - The name of the input field.
 * @property {string} [id] - The unique identifier for the input field.
 * @property {function} [onChange] - Callback for value change, default is `() => true`.
 * @property {function} [onInput] - Callback for input changes, default is `() => true`.
 * @property {function} [onCancel] - Callback for cancel action, default is `() => true`.
 * @property {'view' | 'edit'} [mode='view'] - The initial mode of the component.
 * @property {string} [label] - The label associated with the input field.
 * @property {boolean} [labelInView=true] - Whether to show the label in view mode.
 * @property {boolean} [labelInEdit=true] - Whether to show the label in edit mode.
 * @property {string} [size] - Adjusts the size of the component, e.g., 'lg', 'sm'.
 * @property {number} [tabIndex=0] - Tab index for keyboard navigation.
 * @property {React.ComponentType} [editComponent] - Custom component to render in edit mode.
 * @property {React.ComponentType} [viewComponent] - Custom component to render in view mode.
 * @property {Config} [config] - Configuration options for behavior.
 */
const EditableBase = ({
  value,
  onChange = () => true,
  onInput = () => true,
  onCancel = () => true,
  mode = "view",
  name,
  id,
  label,
  labelInView = true,
  labelInEdit = true,
  size = "",
  tabIndex = 0,
  editComponent: EditComponent,
  viewComponent: ViewComponent,
  config = { revertOnEscape: true, clickOutsideToSave: true },
  ...rest
}) => {
  const [editMode, setEditMode] = useState(mode);
  const [isolated, setIsolated] = useState(value);
  const originalValue = useRef(value); // Keep track of the original value
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Focus the input element when entering edit mode
  useEffect(() => {
    if (editMode === "edit" && id) {
      const inputElement = document.getElementById(id);
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [editMode, id]);

  // Handle click outside to switch to view mode
  useEffect(() => {
    if (config.clickOutsideToSave) {
      const handleClickOutside = (event) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target)
        ) {
          if (config.clickOutsideToSave) {
            handleChange(isolated);
          } else {
            console.debug("go back to view mode");
            setEditMode("view");
          }
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.clickOutsideToSave]);

  const handleCancel = () => {
    setIsolated(originalValue.current);
    onCancel(originalValue.current);
    console.debug("cancel: go back to view mode");
    setEditMode("view");
  };

  const handleChange = (e) => {
    const newValue = e?.target?.value ?? e;
    onChange(newValue);
    console.debug("change", newValue);
    setEditMode("view");
  };

  const handleInput = (e) => {
    const newValue = e?.target?.value ?? e;
    setIsolated(newValue);
    onInput(newValue);
  };

  const handleViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (editMode === "view") {
      originalValue.current = isolated; // Save the original value before editing
      setEditMode("edit");
    }
  };

  const handleEditKeyDown = (e) => {
    if (editMode === "edit") {
      handleKeyPress(e, ["Escape"], handleCancel, { stop: true });
      handleKeyPress(
        e,
        ["Enter"],
        () => {
          handleChange(isolated);
        },
        { stop: true }
      );
    } else {
      handleKeyPress(e, ["Enter", " ", "Space"], handleViewClick, {
        stop: true,
      });
    }
  };

  return (
    <div
      className={`flex items-center border rounded ${
        size === "lg" ? "text-lg" : size === "sm" ? "text-sm" : ""
      }`}
      tabIndex={tabIndex}
      onKeyDown={handleEditKeyDown}
      ref={containerRef}
    >
      {editMode === "edit" ? (
        EditComponent ? (
          <EditComponent
            id={id}
            name={name}
            value={isolated}
            label={label}
            showLabel={labelInEdit}
            onInput={handleInput}
            onChange={handleChange}
            {...rest}
          />
        ) : (
          <>
            <input
              id={id}
              name={name}
              type="text"
              className="p-2 w-full"
              value={isolated}
              onInput={handleInput}
              ref={inputRef}
              {...rest}
            />
            {labelInEdit && label && <span className="ml-2">{label}</span>}
          </>
        )
      ) : ViewComponent ? (
        <ViewComponent
          id={id}
          name={name}
          value={isolated}
          label={label}
          showLabel={labelInView}
          onClick={handleViewClick}
          {...rest}
        />
      ) : (
        <>
          {labelInView && label && <span className="mr-2">{label}</span>}
          <input
            readOnly
            id={id}
            name={name}
            className="bg-transparent border-none cursor-pointer text-gray-900"
            value={isolated}
            tabIndex={-1}
          />
        </>
      )}
    </div>
  );
};

EditableBase.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  onCancel: PropTypes.func,
  mode: PropTypes.oneOf(["view", "edit"]),
  label: PropTypes.string,
  labelInView: PropTypes.bool,
  labelInEdit: PropTypes.bool,
  size: PropTypes.string,
  tabIndex: PropTypes.number,
  editComponent: PropTypes.elementType,
  viewComponent: PropTypes.elementType,
  config: PropTypes.shape({
    revertOnEscape: PropTypes.bool,
    clickOutsideToSave: PropTypes.bool,
  }),
};

export default EditableBase;
