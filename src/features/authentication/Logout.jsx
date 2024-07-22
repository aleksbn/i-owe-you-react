import ButtonIcon from "../../ui/common/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/style/SpinnerMini";

/**
 * Logout function component that handles user logout.
 *
 * @return {JSX.Element} The rendered ButtonIcon component with conditional rendering of HiArrowRightOnRectangle or SpinnerMini.
 */
function Logout() {
  const { logout, isLoggingOut } = useLogout();
  return (
    <ButtonIcon onClick={() => logout()}>
      {!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
