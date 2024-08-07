import { useDarkMode } from "../../context/DarkModeProvider"; // Importing the useDarkMode hook from DarkModeProvider
import ButtonIcon from "../common/ButtonIcon"; // Importing a button icon component
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"; // Importing moon and sun icons from react-icons/hi2

/**
 * Renders a toggle button for switching between dark and light mode.
 *
 * @return {JSX.Element} The rendered toggle button component.
 */
function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Using the useDarkMode hook to access dark mode state and toggle function
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {!isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}

export default DarkModeToggle; // Exporting the DarkModeToggle component as default
