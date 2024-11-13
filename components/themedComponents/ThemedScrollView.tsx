import { ScrollView, type ScrollViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedScrollViewProps = ScrollViewProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "primaryBackground" | "secondaryBackground" | "ternaryBackground";
};

export function ThemedScrollView({
    style,
    lightColor,
    darkColor,
    type = "primaryBackground",
    ...otherProps
}: ThemedScrollViewProps) {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        type
    );

    return <ScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}
