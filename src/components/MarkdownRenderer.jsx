import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import markdownToJsx from 'markdown-to-jsx';
import { loadMarkdown } from '../utils/loadMarkdown'; // Utility function to import markdown

const MarkdownRenderer = ({ fileName }) => {
	const { language } = useParams(); // Extract the language from the URL
	const [content, setContent] = useState('');

	useEffect(() => {
		const fetchMarkdown = async () => {
			const mdContent = await loadMarkdown(language, fileName);
			setContent(mdContent || 'Error loading content.');
		};

		fetchMarkdown();
	}, [language, fileName]);

	return (
		<div className="markdown-content">
			{markdownToJsx(content)}
		</div>
	);
};

export default MarkdownRenderer;