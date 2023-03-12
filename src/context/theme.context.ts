import { createContext } from "react";

export enum ThemeType {
  dark = "dark",
  light = "light",
}
export interface ThemeContextData {
  theme: ThemeType;
  setTheme: (type: ThemeType) => void;
  toggleTheme: () => void;
}
const textInit: ThemeContextData = {
  theme: ThemeType.dark,
  setTheme: () => {},
  toggleTheme: () => {},
};
export const ThemeContext = createContext(textInit);
