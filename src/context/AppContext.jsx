import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { languagesList, translations } from './constants'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
	const [language, setLanguageState] = useState("en")

	const t = (key) => {
		return translations[language][key] || key;
	}

	const setLanguage = lang => {
		setLanguageState(lang);
		document.documentElement.lang = lang;
	}

	// Update the document language attribute
	useEffect(() => {
		document.documentElement.lang = language;
	}, [language])

	const value = {
		language, setLanguage, t, languagesList
	}

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	)
}

AppProvider.propTypes = {
	children: PropTypes.node.isRequired
}

AppProvider.useAppContext = () => useContext(AppContext);
