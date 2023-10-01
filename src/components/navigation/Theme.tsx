interface ThemeToggleProps {}

export function ThemeToggle({}: ThemeToggleProps) {
const theme_list = ["cupcake","custom","light", "dark", "wireframe", "black", "acid", "night"];
  return (
    <select
      data-choose-theme
      className=" min-w-xs select select-sm bg-secondary/60 pl-2 pr-0"
      onChange={(e) => (document.cookie = `theme=${e.target.value}`)}
    >
      {theme_list.map((theme) => {
        return (
          <option key={theme} value={theme}>
            {theme}
          </option>
        );
      })}
    </select>
  );
}
