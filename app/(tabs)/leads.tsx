import { useEffect, useState } from "react";
import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { useThemeColor } from "@/hooks/useThemeColor";
import axiosInstance from "@/utils/axiosInstance";
import LeadCard from "@/components/leadsScreenComponents/LeadCard";
import { ThemedSafeAreaView } from "@/components/themedComponents/ThemedSafeAreaView";
import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import Header from "@/components/generalComponents/Header";

type leadData = {
    id: string;
    company_name: string;
    key_person_name: string;
    lead_status: "Hot" | "Warm" | "Cold";
    created_at: string;
    phone: string;
    card_details: string;
};

export default function LeadsScreen() {
    const iconColor = useThemeColor({}, "text");

    const [leadsData, setLeadsData] = useState<leadData[] | undefined>(
        undefined
    );

    useEffect(() => {
        const fetchLeadsData = async () => {
            const res = await axiosInstance.get("/leads");

            setLeadsData(res.data);
        };

        fetchLeadsData();
    }, []);

    return (
        <ThemedSafeAreaView
            style={styles.safeAreaContainer}
            lightColor="#2B3951"
            darkColor="#2B3951"
        >
            <Header />
            <ThemedView style={styles.container}>
                {leadsData == undefined ? (
                    <ActivityIndicator size="large" color="#2B3951" />
                ) : leadsData.length == 0 ? (
                    <ThemedText textType="subtitle">No leads found</ThemedText>
                ) : (
                    <FlatList
                        style={styles.leadsList}
                        data={leadsData}
                        renderItem={({ item }) => <LeadCard data={item} />}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={() => {
                            return (
                                <ThemedView style={styles.horizontalFlex}>
                                    <ThemedText textType="title">
                                        Leads
                                    </ThemedText>
                                    <Entypo
                                        name="menu"
                                        size={32}
                                        color={iconColor}
                                    />
                                </ThemedView>
                            );
                        }}
                        ItemSeparatorComponent={() => {
                            return <ThemedView style={styles.itemSeperator} />;
                        }}
                        ListFooterComponent={() => {
                            return <ThemedView style={styles.footer} />;
                        }}
                    />
                )}
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
        alignItems: "center",
        justifyContent: "center",
    },
    horizontalFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
    leadsList: {
        width: "100%",
        paddingHorizontal: 24,
    },
    itemSeperator: {
        width: "100%",
        height: 20,
    },
    footer: {
        height: 24,
    },
});
