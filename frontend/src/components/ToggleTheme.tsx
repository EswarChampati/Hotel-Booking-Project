import Light from "../assets/sun.svg";
import Dark from "../assets/moon.svg";
import useTheme from "../hooks/useTheme";

const ToggleTheme: React.FC = () => {
  const { isDarkMode, themeClickHandler } = useTheme();
  return (
    <button onClick={themeClickHandler}>
      {isDarkMode ? (
        <img src={Dark} alt="Dark" />
      ) : (
        <img src={Light} alt="Light" />
      )}
    </button>
  );
};
export default ToggleTheme;
