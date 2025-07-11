import { StylesConfig } from "react-select";

export interface ColorOption {
  value: string;
  label: string;
  color: string;
}

export const reactSelectCustomStyles: StylesConfig<ColorOption, true> = {
  option: (base, state) => {
    return {
      ...base,
      color: `#${state.data.color}`,
      backgroundColor: state.isFocused ? `#${state.data.color}20` : undefined,
    };
  },
  multiValue: (base, state) => {
    return {
      ...base,
      backgroundColor: `#${state.data.color}20`,
    };
  },
  multiValueLabel: (base, state) => {
    return {
      ...base,
      color: `#${state.data.color}`,
    };
  },
};
