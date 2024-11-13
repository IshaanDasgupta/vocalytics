import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "text" | "mutedText";
    textType?: "title" | "subtitle" | "defaultSemiBold" | "default" | "small";
};

export function ThemedText({
    style,
    lightColor,
    darkColor,
    type = "text",
    textType = "default",
    ...rest
}: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, type);

    return (
        <Text
            style={[
                { color },
                textType === "title" ? styles.title : undefined,
                textType === "subtitle" ? styles.subtitle : undefined,
                textType === "defaultSemiBold"
                    ? styles.defaultSemiBold
                    : undefined,
                textType === "default" ? styles.default : undefined,
                textType === "small" ? styles.small : undefined,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        lineHeight: 28,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: "600",
    },
    default: {
        fontSize: 12,
        lineHeight: 14,
    },
    small: {
        fontSize: 10,
        lineHeight: 10,
    },
});
