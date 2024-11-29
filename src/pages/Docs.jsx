import { Routes, Route } from 'react-router-dom';
import DocsLayout from '../components/DocsLayout';
import MarkdownRenderer from '../components/MarkdownRenderer';

const Docs = () => {
	return (
		<DocsLayout>
			<Routes>
				<Route path="dev/state" element={<MarkdownRenderer fileName="dev/state" />} />
			</Routes>
		</DocsLayout>
	);
};

export default Docs;