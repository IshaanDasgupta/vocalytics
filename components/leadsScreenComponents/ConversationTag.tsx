import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedView } from "@/components/themedComponents/ThemedView";

type ConversationTagProps = {
    tag_text: string;
};

export default function ConversationTag({ tag_text }: ConversationTagProps) {
    const iconColor = useThemeColor({}, "text");

    return (
        <ThemedView style={styles.tagContainer} type="ternaryBackground">
            <MaterialCommunityIcons name="tag" size={16} color={iconColor} />
            <ThemedText>{tag_text}</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    tagContainer: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
});
