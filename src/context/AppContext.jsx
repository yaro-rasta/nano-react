import { createContext, useContext, useEffect, useCallback, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useLSState, useIDbState } from '..'

/**
 * @comment #dev/context.md
 * ## Базовий контекст для додатку
 * ### Функції і дані
 * 1. Мова: мова вибрана користувачем, за замовченням обирається одна із доступних 
 * мов з Accept-Language заголовка.
 * 2. Тема: темна (нічна 1), світла (денна -1), система (системні налаштування 0).
 * 3. Accessibility: доступність у різних формах (горячі клавіші, обмежений зір, обмежений рух).
 * 4. Кеш працює на рівні сервера і headers.
 */
const AppContext = createContext()

export const AppProvider = ({ children, languagesAssetUrl = '/t/index.json' }) => {
	const [languagesCache, setLanguagesCache] = useLSState('languages', {})
	const [language, setLanguageState] = useLSState('lang', null)
	/**
	 * @comment #dev/context.md
	 * ### Переклади (internatialization)
	 * Зберігається у форматі: { 'en': { 'Cancel': 'Cancel', 'next': 'Go next' } }
	 */
	// const [translations, setTranslations] = useIDbState('translations', {})
	const [translations, setTranslations] = useLSState('translations', {})
	const languagesRef = useRef(false)
	const translationsRef = useRef(false)

	// Translation function that retrieves the translated string by key for the current language
	const t = useCallback((key) => {
		return translations[language]?.[key] || key;
	}, [translations, language]);

	const setLanguage = useCallback((lang) => {
		console.log('setLanguage', lang);
		setLanguageState(lang);
		// document.documentElement.lang = lang;
	}, [setLanguageState])

	useEffect(() => {
		const loadLanguages = async () => {
			if (languagesRef.current) {
				return
			}
			console.log('loadLanguages')
			try {
				languagesRef.current = true
				const response = await fetch(languagesAssetUrl)
				const data = await response.json()
				setLanguagesCache(data)
			} catch (err) {
				console.error("Error loading languages:", err)
			}
			document.documentElement.lang = language
		};
		loadLanguages()
	}, [language, languagesAssetUrl, languagesCache, setLanguagesCache])

	useEffect(() => {
		const getDefaultLanguage = () => {
			const userLanguages = navigator.languages || [navigator.language || 'en']
			for (const lang of userLanguages) {
				if (languagesCache[lang]) {
					return lang
				}
			}
			return 'en'
		}
		const loadTranslations = async () => {
			if (translationsRef.current) {
				return
			}
			console.log('loadTranslations')
			if (!language) {
				setLanguage(getDefaultLanguage())
				return
			}
			const trUrl = languagesCache[language];
			if (!trUrl) {
				setTranslations(prev => ({ ...prev, [language]: {} }))
				return
			}
			try {
				translationsRef.current = true
				const response = await fetch(trUrl)
				const data = await response.json()
				setTranslations(prev => ({ ...prev, [language]: data }))
			} catch (err) {
				console.error("Error loading translations:", err)
			}
		}
		loadTranslations()
	}, [languagesCache, language, setTranslations, setLanguage])

	const value = useMemo(() => ({
		language,
		setLanguage,
		t,
		languagesCache
	}), [language, setLanguage, t, languagesCache])

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	)
}

AppProvider.propTypes = {
	children: PropTypes.node.isRequired,
	languagesAssetUrl: PropTypes.string,
}

// Custom hook to access the AppContext values
AppProvider.useAppContext = () => useContext(AppContext);