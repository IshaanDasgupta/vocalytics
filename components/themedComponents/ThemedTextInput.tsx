import { StyleSheet, TextInput, type TextInputProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextInputProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedTextInput({
    style,
    lightColor,
    darkColor,
    ...otherProps
}: ThemedTextInputProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
    const placeholderTextColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "mutedText"
    );

    return (
        <TextInput
            style={[{ color }, style, styles.default]}
            placeholderTextColor={placeholderTextColor}
            {...otherProps}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 12,
        lineHeight: 14,
    },
});
