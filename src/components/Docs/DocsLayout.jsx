import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const DocsLayout = ({ children }) => {
	const { language, setLanguage, t, languagesList } = useAppContext();

	// List of documentation routes with paths that include the language code
	const docsNav = [
		{ path: `/docs/${language}/dev/state`, label: 'State' },
	];

	return (
		<div className="docs-container">
			<aside className="sidebar">
				{/* Language Selector */}
				<div className="language-selector" role="region" aria-labelledby="language-label">
					<label id="language-label" htmlFor="language">
						{t('Language')}:
					</label>
					<select
						id="language"
						value={language}
						onChange={(e) => setLanguage(e.target.value)}
						aria-label={t('Select language')}
					>
						{languagesList.map((lang) => (
							<option key={lang.locale} value={lang.locale}>
								{t(lang.label)}
							</option>
						))}
					</select>
				</div>

				{/* Navigation Links */}
				<nav aria-label={t('Documentation Navigation')}>
					<ul className="docs-nav">
						{docsNav.map((doc) => (
							<li key={doc.path}>
								<Link to={doc.path}>{t(doc.label)}</Link>
							</li>
						))}
					</ul>
				</nav>
			</aside>

			{/* Main Content Area */}
			<main className="content" role="main">
				{children}
			</main>
		</div>
	);
};

export default DocsLayout;