import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import DocsLayout from './components/Docs/DocsLayout';
import FormLayout from './components/Form/FormLayout';
import MarkdownRenderer from './components/MarkdownRenderer'; // Updated component to handle dynamic imports
import { AppProvider } from './context/AppContext';
import './index.css';

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AppProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/form" element={<FormLayout />} />
					<Route path="/:language/docs/*" element={<DocsLayout />}>
						<Route path="dev/state" element={<MarkdownRenderer fileName="dev/state.md" />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AppProvider>
	</React.StrictMode>
);