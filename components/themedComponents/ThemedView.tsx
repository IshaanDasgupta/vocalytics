import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "primaryBackground" | "secondaryBackground" | "ternaryBackground";
};

export function ThemedView({
    style,
    lightColor,
    darkColor,
    type = "primaryBackground",
    ...otherProps
}: ThemedViewProps) {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        type
    );

    return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
