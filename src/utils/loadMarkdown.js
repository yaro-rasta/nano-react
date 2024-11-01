export const loadMarkdown = async (language, fileName) => {
	try {
		// Dynamically import the Markdown file based on language
		return (await import(`../docs/${language}/${fileName}.md`)).default;
	} catch (error) {
		console.error(`Error loading ${fileName} for language ${language}:`, error);
		return null;
	}
};