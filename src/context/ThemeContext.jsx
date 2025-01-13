import { createContext } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

export const ThemeProvider = ({ theme, children }) => (
	<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

// Add PropTypes for validation
ThemeProvider.propTypes = {
	theme: PropTypes.object.isRequired, // Assuming theme is an object
	children: PropTypes.node.isRequired,
};

export default ThemeContext;
