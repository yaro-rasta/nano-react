import { useContext } from "react";
import ThemeContext from "./ThemeProvider";

// Export the hook from a separate file
export const useTheme = () => useContext(ThemeContext);
