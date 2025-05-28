// Mapping explicite des couleurs pour éviter que Tailwind purge les classes dynamiques
const colorMap: Record<string, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  darkGray: "bg-dark-gray",
  lightGray: "bg-light-gray",
  lightPurple: "bg-light-purple",
  purple: "bg-purple",
  orange: "bg-orange",
  green: "bg-green",
};

export default colorMap;
