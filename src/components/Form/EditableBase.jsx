import React, { useState, useRef, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { handleKeyPress } from './utils';

/**
 * A React component that provides an editable input or a view mode based on the current state.
 * The component can toggle between 'view' and 'edit' modes, with support for custom view and edit components.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {string|number} props.value - The initial value of the component.
 * @param {function} props.onChange - Callback function called when the value changes.
 * @param {string} [props.mode='view'] - Initial mode of the component, either 'view' or 'edit'.
 * @param {string} props.name - The name attribute for the input element.
 * @param {string} props.id - The id attribute for the input element.
 * @param {string} props.label - Label text to display alongside the input.
 * @param {boolean} [props.labelInView=true] - Whether to display the label in view mode.
 * @param {boolean} [props.labelInEdit=true] - Whether to display the label in edit mode.
 * @param {string} [props.size=''] - The size of the input element (Bootstrap form control size).
 * @param {number} [props.tabIndex=0] - Tab index for the input group.
 * @param {React.ComponentType} [props.editComponent] - Custom component to use in edit mode.
 * @param {React.ComponentType} [props.viewComponent] - Custom component to use in view mode.
 * @param {...Object} rest - Additional props to pass to the input components.
 *
 * @returns {JSX.Element} The rendered component.
 */
const EditableBase = ({
	value,
	onChange = v => undefined,
	onInput = v => undefined,
	mode = 'view',
	name,
	id,
	label,
	labelInView = true,
	labelInEdit = true,
	size = '',
	tabIndex = 0,
	editComponent: EditComponent,
	viewComponent: ViewComponent,
	...rest
}) => {
	const [editMode, setEditMode] = useState(mode);
	const [isolated, setIsolated] = useState(value);
	const viewRef = useRef(null);
	const inputRef = useRef(null);

	useEffect(() => {
		// Ensure the input gets focus when entering edit mode
		if (editMode === 'edit' && inputRef.current) {
			inputRef.current.focus();
		}
	}, [editMode]);
	useEffect(() => {
		console.debug('value', value);
	}, [value]);

	const handleViewClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (editMode === 'view') setEditMode('edit');
	};

	const handleBlur = () => {
		setEditMode('view');
		viewRef.current?.focus();
	};

	const handleInput = e => {
		if (e && e.target && typeof e.target.value !== 'undefined') {
			setIsolated(e.target.value);
			onInput(e.target.value);
		} else if (typeof e === 'string' || typeof e === 'number') {
			// In case `handleChange` is called directly with a value (for custom components)
			setIsolated(e);
			onInput(e);
		}
	};

	const handleCancel = e => {
		setEditMode('view');
	};

	const handleChange = e => {
		setEditMode('view');
		if (e && e.target && typeof e.target.value !== 'undefined') {
			onChange(e.target.value);
		} else {
			onChange(e);
		}
	};

	/**
	 * view === mode
	 *   Enter || Space => mode => edit
	 * edit === mode
	 *   Escape => mode => view & value => initalValue
	 *   Enter => mode => view & value => value
	 */
	const handleEditKeyDown = (e) => {
		if ('edit' === editMode) {
			handleKeyPress(e, ['Escape'], handleCancel, { stop: true });
			handleKeyPress(e, ['Enter'], handleChange, { stop: true });
		} else {
			handleKeyPress(e, ['Enter', ' ', 'Space'], handleViewClick, { stop: true });
		}
	};

	return (
		<InputGroup tabIndex={tabIndex} onKeyDown={handleEditKeyDown}>
			{editMode === 'edit' ? (
				EditComponent ? (
					<EditComponent
						id={id}
						name={name}
						ref={inputRef} // Ensure the ref is applied to the edit component
						value={isolated}
						label={label}
						labelInEdit={labelInEdit}
						onInput={handleInput}
						onChange={handleChange}
						onBlur={handleBlur}
						autoFocus
						{...rest}
					/>
				) : (
					<>
						<Form.Control
							id={id}
							name={name}
							ref={inputRef} // Ensure the ref is applied to the input
							type="text"
							size={size}
							value={isolated}
							onInput={handleInput}
							onChange={handleChange}
							onBlur={handleBlur}
							autoFocus
							{...rest}
						/>
						{labelInEdit && 'undefined' !== typeof label && 
							<InputGroup.Text>{label}</InputGroup.Text>}
					</>
				)
			) : (
				ViewComponent ? (
					<ViewComponent
						id={id}
						name={name}
						value={isolated}
						label={label}
						labelInView={labelInView}
						onClick={handleViewClick}
						ref={viewRef}
						{...rest}
					/>
				) : (
					<>
						{labelInView && 'undefined' !== typeof label && 
							<InputGroup.Text>{label}</InputGroup.Text>}
						<Form.Control
							// plaintext
							readOnly
							id={id}
							name={name}
							size={size}
							value={isolated}
							onClick={handleViewClick}
							ref={viewRef}
							tabIndex={-1}
						/>
					</>
				)
			)}
		</InputGroup>
	);
};

export default EditableBase;