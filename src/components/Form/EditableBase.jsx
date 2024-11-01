import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { handleKeyPress } from './utils'

const EditableBase = ({
	value,
	onChange = () => undefined,
	onInput = () => undefined,
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
	const [editMode, setEditMode] = useState(mode)
	const [isolated, setIsolated] = useState(value)
	// @todo fix the refs, they don't really work, so find another way to use an Editable components with the tab index but without references. When user uses tab to navigate through components and click Enter edit mode must be switched to and input element must be focused.
	const viewRef = useRef(null)
	const inputRef = useRef(null)

	useEffect(() => {
		if (editMode === 'edit' && inputRef.current) {
			inputRef.current.focus()
		}
	}, [editMode])

	const handleViewClick = (e) => {
		e.preventDefault()
		e.stopPropagation()
		if (editMode === 'view') setEditMode('edit')
	};

	const handleBlur = () => {
		setEditMode('view')
		viewRef.current?.focus()
	};

	const handleInput = (e) => {
		if (e && e.target && typeof e.target.value !== 'undefined') {
			setIsolated(e.target.value)
			onInput(e.target.value)
		} else if (typeof e === 'string' || typeof e === 'number') {
			setIsolated(e)
			onInput(e)
		}
	};

	const handleCancel = () => {
		setEditMode('view')
	};

	const handleChange = (e) => {
		setEditMode('view')
		if (e && e.target && typeof e.target.value !== 'undefined') {
			onChange(e.target.value)
		} else {
			onChange(e)
		}
	};

	const handleEditKeyDown = (e) => {
		if (editMode === 'edit') {
			handleKeyPress(e, ['Escape'], handleCancel, { stop: true })
			handleKeyPress(e, ['Enter'], handleChange, { stop: true })
		} else {
			handleKeyPress(e, ['Enter', ' ', 'Space'], handleViewClick, { stop: true })
		}
	};

	return (
		<div
			className={`flex items-center ${size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-sm' : ''}`}
			tabIndex={tabIndex}
			onKeyDown={handleEditKeyDown}
		>
			{editMode === 'edit' ? (
				EditComponent ? (
					<EditComponent
						id={id}
						name={name}
						ref={inputRef}
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
						<input
							id={id}
							name={name}
							ref={inputRef}
							type="text"
							className="border rounded p-2 w-full"
							value={isolated}
							onInput={handleInput}
							onChange={handleChange}
							onBlur={handleBlur}
							autoFocus
							{...rest}
						/>
						{labelInEdit && label && (
							<span className="ml-2 text-gray-700">{label}</span>
						)}
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
						{labelInView && label && (
							<span className="mr-2 text-gray-700">{label}</span>
						)}
						<input
							readOnly
							id={id}
							name={name}
							className="bg-transparent border-none cursor-pointer text-gray-900"
							value={isolated}
							onClick={handleViewClick}
							ref={viewRef}
							tabIndex={-1}
						/>
					</>
				)
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
	mode: PropTypes.oneOf(['view', 'edit']),
	label: PropTypes.string,
	labelInView: PropTypes.bool,
	labelInEdit: PropTypes.bool,
	size: PropTypes.string,
	tabIndex: PropTypes.number,
	editComponent: PropTypes.elementType,
	viewComponent: PropTypes.elementType,
}

export default EditableBase