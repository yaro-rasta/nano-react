import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import markdownToJsx from 'markdown-to-jsx';
import { loadMarkdown } from '../utils/loadMarkdown'; // Utility function to import markdown

const MarkdownRenderer = ({ fileName }) => {
	const { language } = useParams(); // Extract the language from the URL
	const [content, setContent] = useState('');

	useEffect(() => {
		const fetchMarkdown = async () => {
			try {
				const mdContent = await loadMarkdown(language, fileName);
				setContent(mdContent || 'Error loading content.');
			} catch (err) {
				setContent('Error loading content: ' + err.message);
			}
		};

		fetchMarkdown();
	}, [language, fileName]);

	return (
		<div className="markdown-content">
			{markdownToJsx(content)}
		</div>
	);
};

// Add prop type validation
MarkdownRenderer.propTypes = {
	fileName: PropTypes.string.isRequired,
};

export default MarkdownRenderer;