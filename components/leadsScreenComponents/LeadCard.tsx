import { StyleSheet } from "react-native";
import { router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useThemeColor } from "@/hooks/useThemeColor";
import LeadStatus from "@/components/leadsScreenComponents/LeadStatus";
import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import { ThemedPressable } from "@/components/themedComponents/ThemedPressable";

type LeadCardProps = {
    data: {
        id: string;
        company_name: string;
        key_person_name: string;
        lead_status: "Hot" | "Warm" | "Cold";
        created_at: string;
        phone: string;
        card_details: string;
    };
};

const differenceInDays = (startDate: Date, endDate: Date) => {
    const diff = endDate.getTime() - startDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export default function LeadCard(props: LeadCardProps) {
    const iconColor = useThemeColor({}, "text");

    const redirectToLeadScreen = (id: string) => {
        router.push(`/lead/${id}`);
    };

    const data = props.data;
    return (
        <ThemedPressable
            style={styles.cardContainer}
            onPress={() => redirectToLeadScreen(data.id)}
        >
            <ThemedView style={styles.horizontalFlex}>
                <ThemedView style={styles.textContainer}>
                    <ThemedText textType="subtitle">
                        {data.company_name}
                    </ThemedText>

                    <ThemedText>{data.key_person_name}</ThemedText>
                </ThemedView>
                <ThemedView>
                    <LeadStatus lead_status={data.lead_status} />
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.horizontalFlex}>
                <ThemedView style={styles.metaDataFlex}>
                    <ThemedView style={styles.iconFlex}>
                        <FontAwesome name="user" size={16} color={iconColor} />
                        <ThemedView style={styles.textContainer}>
                            <ThemedText>{data.key_person_name}</ThemedText>
                        </ThemedView>
                    </ThemedView>
                    <ThemedView style={styles.iconFlex}>
                        <MaterialCommunityIcons
                            name="clock"
                            size={16}
                            color={iconColor}
                            style={styles.timeIcon}
                        />
                        <ThemedView style={styles.textContainer}>
                            <ThemedText>
                                {differenceInDays(
                                    new Date(data.created_at),
                                    new Date()
                                )
                                    ? `${differenceInDays(
                                          new Date(data.created_at),
                                          new Date()
                                      )} days old`
                                    : "Today"}
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.actionIconFlex}>
                    {data.card_details ? (
                        <MaterialCommunityIcons
                            name="card-account-details"
                            size={32}
                            color={iconColor}
                        />
                    ) : (
                        <MaterialCommunityIcons
                            name="card-account-details-outline"
                            size={32}
                            color={iconColor}
                        />
                    )}

                    {data.phone ? (
                        <MaterialCommunityIcons
                            name="phone"
                            size={28}
                            color={iconColor}
                        />
                    ) : (
                        <MaterialCommunityIcons
                            name="phone-outline"
                            size={28}
                            color={iconColor}
                        />
                    )}
                </ThemedView>
            </ThemedView>
        </ThemedPressable>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 24,
        borderRadius: 8,
        flexDirection: "column",
        gap: 24,
        borderWidth: 1,
        borderColor: "#D9D9D9",
    },
    horizontalFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textContainer: {
        flex: 1,
    },
    metaDataFlex: {
        flex: 1,
        flexDirection: "column",
        gap: 8,
    },
    iconFlex: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    timeIcon: {
        marginLeft: -2,
    },
    actionIconFlex: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
});
