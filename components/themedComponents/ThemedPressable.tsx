import { Pressable, type PressableProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedPressableProps = PressableProps & {
    lightColor?: string;
    darkColor?: string;
    type?:
        | "primaryBackground"
        | "secondaryBackground"
        | "ternaryBackground"
        | "highlight";
};

export function ThemedPressable({
    style,
    lightColor,
    darkColor,
    type = "primaryBackground",
    ...otherProps
}: ThemedPressableProps) {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        type
    );

    return <Pressable style={[{ backgroundColor }, style]} {...otherProps} />;
}
