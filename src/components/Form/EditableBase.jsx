import { useTheme } from "../../context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { handleKeyPress } from "./utils";

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
	size = "md",
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
	const theme = useTheme();

	// Focus the input element when entering edit mode
	useEffect(() => {
		if (editMode === "edit" && id) {
			const inputElement = document.getElementById(id);
			if (inputElement) {
				inputElement.focus();
			}
		}
	}, [editMode, id]);

	// Sync isolated state with parent `value` prop
	useEffect(() => {
		setIsolated(value)
	}, [value, setIsolated])

	// Handle click outside to switch to view mode
	useEffect(() => {
		if (config.clickOutsideToSave) {
			const handleClickOutside = (event) => {
				console.log(name, editMode);
				if (
					containerRef.current &&
					!containerRef.current.contains(event.target) &&
					'edit' === editMode
				) {
					console.debug(containerRef.current, event.target)
					if (config.clickOutsideToSave) {
						handleChange(isolated)
					} else {
						console.debug("go back to view mode")
						setEditMode("view")
					}
				}
			};

			document.addEventListener("mousedown", handleClickOutside)
			document.addEventListener("touchstart", handleClickOutside)

			return () => {
				document.removeEventListener("mousedown", handleClickOutside)
				document.removeEventListener("touchstart", handleClickOutside)
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode, config.clickOutsideToSave])

	const handleCancel = () => {
		setIsolated(originalValue.current)
		onCancel(originalValue.current)
		console.debug("cancel: go back to view mode")
		setEditMode("view")
	};

	const handleChange = (e) => {
		const newValue = e?.target?.value ?? e;
		onChange(newValue);
		console.debug("change", newValue);
		console.debug("go back to view mode")
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
			console.log('edit mode', name)
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
			className={`${theme.container} ${theme.sizes?.[size]}`}
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
							className={theme.input}
							value={isolated}
							onInput={handleInput}
							ref={inputRef}
							{...rest}
						/>
						{labelInEdit && label && <span className={theme.editInput}>{label}</span>}
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
				<div className={theme.viewContainer} onClick={handleViewClick}>
					{labelInView && label && <label className={theme.viewLabel || theme.label}>{label}</label>}
					<span className={theme.value}>{value}</span>
				</div>
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
