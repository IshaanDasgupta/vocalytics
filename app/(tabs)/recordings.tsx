import Header from "@/components/generalComponents/Header";
import { ThemedSafeAreaView } from "@/components/themedComponents/ThemedSafeAreaView";
import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import { StyleSheet } from "react-native";

export default function RecordingsScreen() {
    return (
        <ThemedSafeAreaView
            style={styles.safeAreaContainer}
            lightColor="#2B3951"
            darkColor="#2B3951"
        >
            <Header />
            <ThemedView style={styles.container}>
                <ThemedText textType="title">Recordings</ThemedText>
            </ThemedView>
        </ThemedSafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
    },
});
