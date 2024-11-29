import { createContext, useContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation

const ThemeContext = createContext();

export const ThemeProvider = ({ theme, children }) => (
	<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

// Add PropTypes for validation
ThemeProvider.propTypes = {
	theme: PropTypes.object.isRequired, // Assuming theme is an object
	children: PropTypes.node.isRequired,
};

// Export useTheme after the component to avoid Fast Refresh warning
export const useTheme = () => useContext(ThemeContext);