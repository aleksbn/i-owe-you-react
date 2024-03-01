import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

function DarkModeToggle() {
	const isDarkMode = false;
	return (
		<ButtonIcon>
			{!isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
		</ButtonIcon>
	);
}

export default DarkModeToggle;
