import { useLSState } from '../..'
import { AppProvider } from '../../context/AppContext'
import EditableString from './EditableString'

function FormLayout() {
	const { t } = AppProvider.useAppContext();
	const [textOneLine, setTextOneLine] = useLSState('textOneLine', 'Text in one line')
	return (
		<>
			<EditableString
				id='textOneLine'
				name='textOneLine'
				label={t('Name')}
				value={textOneLine}
				onChange={setTextOneLine}
			/>
		</>
	)
}

export default FormLayout
