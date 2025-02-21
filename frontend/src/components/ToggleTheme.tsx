import { BsMoon, BsSun } from "react-icons/bs";
import useTheme from "../hooks/useTheme";

const ToggleTheme: React.FC = () => {
  const { isDarkMode, themeClickHandler } = useTheme();
  return (
    <button onClick={themeClickHandler}>
      {isDarkMode ? (
        <BsMoon className="text-xl " data-testid="moon-icon" />
      ) : (
        <BsSun className="text-xl" data-testid="sun-icon" />
      )}
    </button>
  );
};
export default ToggleTheme;
