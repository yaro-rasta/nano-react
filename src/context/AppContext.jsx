import { createContext, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { languagesList, translations } from './constants'
import { useLSState, useIDbState } from '..'

/**
 * @comment #dev/context.md
 * ## Базовий контекст для додатку
 * ### Фукнції і дані
 * 1. Тема: темна (нічна 1), світла (денна -1), система (системні налаштування 0).
 * 2. Мова: мова вибрана користувачем, за замовчення обирається одна із доступних 
 * мов з Accept-Language заголовка.
 * 3. Accessibility: доступність у різних формах (горячі клавіши, обмежений зір, обмежений рух).
 * 4. Кеш: зберігати дані для використання офлайн у 3 рівні:
 *   - до наступної версії (бажано пакувати у dist)
 *   - довге зберігання (+- доба і довше)
 *   - коротке зберігання (секунди, хвилини або години).
 */
const AppContext = createContext()

export const AppProvider = ({ children, languagesAssetUrl = '/t/index.json' }) => {
	// @todo знайди найбільш підходящу мову за замовченням з Accept-Language, якщо не була ще вибрана
	const [language, setLanguageState] = useLSState('lang', document.documentElement.lang || 'en');
	// @todo завантажуй languagesAssetUrl у якому є всі доступні мови у форматі { "en": "en.json", "uk": "uk.json" }
	// зберігай мови у кеші за допомогою useIDbState()
	// встанови обрану мову у translations

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
