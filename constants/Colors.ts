/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#F44336";
const tintColorDark = "#F44336";

export const Colors = {
    light: {
        text: "#11181C",
        mutedText: "#757575",
        primaryBackground: "#fff",
        secondaryBackground: "#F5F5F5",
        ternaryBackground: "#D9D9D9",
        tint: tintColorLight,
        icon: "#687076",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight,
        highlight: "#F44336",
    },
    dark: {
        text: "#ECEDEE",
        mutedText: "#ECEDEE",
        primaryBackground: "#151515",
        secondaryBackground: "#242424",
        ternaryBackground: "#383838",
        tint: tintColorDark,
        icon: "#9BA1A6",
        tabIconDefault: "#9BA1A6",
        tabIconSelected: tintColorDark,
        highlight: "#F44336",
    },
};
