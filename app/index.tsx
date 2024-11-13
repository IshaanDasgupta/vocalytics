import { ThemedPressable } from "@/components/themedComponents/ThemedPressable";
import { ThemedSafeAreaView } from "@/components/themedComponents/ThemedSafeAreaView";
import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Banner() {
    const redirectToLeads = () => {
        router.replace("/(tabs)/leads");
    };

    return (
        <ThemedSafeAreaView
            style={styles.safeAreacontainer}
            lightColor="#2B3951"
            darkColor="#2B3951"
        >
            <ThemedView style={styles.container}>
                <Svg
                    height="100%"
                    width="100%"
                    viewBox="0 0 100 100"
                    style={styles.headerSvg}
                >
                    <Path
                        d="M0 0 L0 40 L40 20 Q50 15 60 23 L100 60 L100 0 Z"
                        stroke="#2B3951"
                        fill="#2B3951"
                    />
                </Svg>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ThemedView style={styles.bannerContainer}>
                        <ThemedView style={styles.logoContainer}>
                            <Image
                                style={styles.logoIcon}
                                source={require("@/assets/images/banner/logoIcon-1x.png")}
                            />
                            <ThemedText
                                textType="title"
                                style={styles.logoText}
                            >
                                Vocalytics AI
                            </ThemedText>
                        </ThemedView>

                        <Image
                            style={styles.bannerGraphic}
                            source={require("@/assets/images/banner/bannerGraphic-1x.png")}
                        />
                        <ThemedText textType="title">
                            Discover the power of conversational insights
                        </ThemedText>
                        <ThemedPressable
                            style={styles.actionButton}
                            onPress={() => redirectToLeads()}
                            type="primaryBackground"
                        >
                            <ThemedText textType="defaultSemiBold">
                                Dive into your leads
                            </ThemedText>
                        </ThemedPressable>
                    </ThemedView>
                </ScrollView>
            </ThemedView>
        </ThemedSafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreacontainer: {
        flex: 1,
        position: "relative",
    },
    container: {
        flex: 1,
        position: "relative",
    },
    bannerContainer: {
        width: "75%",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0)",
        gap: 32,
    },
    headerSvg: {
        position: "absolute",
        top: "-27%",
        left: 0,
        right: 0,
        bottom: 0,
    },
    logoContainer: {
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    logoIcon: {
        width: 74,
        height: 74,
    },
    logoText: {
        fontSize: 32,
        lineHeight: 38,
    },
    bannerGraphic: {
        width: 250,
        height: 234,
    },
    actionButton: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        borderColor: "#8F8F8F",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
