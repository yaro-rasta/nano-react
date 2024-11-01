import React, { createContext, useContext, useEffect, useState } from 'react';

// Sample translations
const translations = {
	uk: {},
	en: {
		introduction: "Introduction",
		gettingStarted: "Getting Started",
		usage: "Usage",
		// Add more translations here
	},
	fr: {},
	es: {
		introduction: "Introducción",
		gettingStarted: "Empezando",
		usage: "Uso",
		// Add more translations here
	},
	nl: {},
	de: {},
	cs: {},
	bg: {},
	be: {},
	sr: {},
	it: {},
	ru: {},
	// Add more languages as needed
};

const AppContext = createContext();

const languagesList = [
	{ locale: 'uk', label: 'Ukrainian' },
	{ locale: 'en', label: 'English' },
	{ locale: 'fr', label: 'French' },
	{ locale: 'es', label: 'Spanish' },
	{ locale: 'nl', label: 'Netherlands' },
	{ locale: 'de', label: 'German' },
	{ locale: 'cs', label: 'Czech' },
	{ locale: 'bg', label: 'Bulgarian' },
	{ locale: 'be', label: 'Belarusian' },
	{ locale: 'sr', label: 'Serbian' },
	{ locale: 'it', label: 'Italian' },
	{ locale: 'ru', label: 'Russian' },
];
export const AppProvider = ({ children }) => {
	const [language, setLanguageState] = useState("en"); // Default language

	const t = (key) => {
		return translations[language][key] || key;
	};

	const setLanguage = lang => {
		setLanguageState(lang);
		document.documentElement.lang = lang;
	};

	// Update the document language attribute
	useEffect(() => {
		document.documentElement.lang = language;
	}, [language]);

	const value = {
		language, setLanguage, t, languagesList
	};

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);