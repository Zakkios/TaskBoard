export const variantClasses: Record<string, string> = {
  secondary:
    "bg-secondary text-white cursor-pointer hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200",
  "dark-gray":
    "bg-dark-gray text-white cursor-pointer hover:bg-gray-700 flex items-center gap-2 py-2 px-5 mr-8 rounded-4xl",
  "nav-item-active":
    "bg-light-purple cursor-pointer hover:bg-purple text-secondary font-semibold px-5 py-3 rounded-lg transition-colors duration-200",
  "nav-item":
    "text-tertiary cursor-pointer hover:bg-light-purple hover:text-black px-5 py-3 rounded-lg transition-colors duration-200",
  "blue-gradient":
    "bg-gradient-to-r from-[#231391] to-[#3C21F7] text-white cursor-pointer hover:scale-105 hover:from-[#3C21F7] hover:to-gradient-purple px-6 py-3 rounded-lg font-semibold transition-all duration-200",
  disabled:
    "bg-gray-300 text-gray-500 cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-colors duration-200",
};
