import { ThemedText } from "@/components/themedComponents/ThemedText";
import { StyleSheet } from "react-native";

type LeadStatusProps = {
    lead_status: "Hot" | "Warm" | "Cold";
};

export default function LeadStatus({ lead_status }: LeadStatusProps) {
    const leadStatusColor = {
        Hot: "#F44336",
        Warm: "#FB9334",
        Cold: "#0E8AD7",
    };

    return (
        <ThemedText
            style={{
                ...styles.leadStatus,
                backgroundColor: leadStatusColor[lead_status],
            }}
            lightColor="#fff"
            darkColor="#fff"
        >
            {lead_status}
        </ThemedText>
    );
}

const styles = StyleSheet.create({
    leadStatus: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 24,
    },
});
