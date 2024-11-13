import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import { Image, StyleSheet } from "react-native";

export default function Header() {
    return (
        <>
            <ThemedView
                style={styles.container}
                lightColor="#2B3951"
                darkColor="#2B3951"
            >
                <ThemedView
                    style={styles.logoFlex}
                    lightColor="#2B3951"
                    darkColor="#2B3951"
                >
                    <Image
                        style={styles.logoIcon}
                        source={require("@/assets/images/header/logoIcon-1x.png")}
                    />
                    <ThemedText
                        textType="subtitle"
                        lightColor="#fff"
                        darkColor="#fff"
                    >
                        Vocalytics AI
                    </ThemedText>
                </ThemedView>

                <Image
                    style={styles.userIcon}
                    source={require("@/assets/images/header/userIcon-1x.png")}
                />
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingBottom: 4,
    },
    logoFlex: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    logoIcon: {
        width: 22,
        height: 22,
    },
    userIcon: {
        width: 22,
        height: 22,
    },
});
