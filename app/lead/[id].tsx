import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Entypo } from "@expo/vector-icons";

import { useThemeColor } from "@/hooks/useThemeColor";
import axiosInstance from "@/utils/axiosInstance";
import Header from "@/components/generalComponents/Header";
import ConversationTag from "@/components/leadsScreenComponents/ConversationTag";
import LeadStatus from "@/components/leadsScreenComponents/LeadStatus";
import { ThemedPressable } from "@/components/themedComponents/ThemedPressable";
import { ThemedSafeAreaView } from "@/components/themedComponents/ThemedSafeAreaView";
import { ThemedScrollView } from "@/components/themedComponents/ThemedScrollView";
import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import { ThemedTextInput } from "@/components/themedComponents/ThemedTextInput";

type leadData = {
    id: string;
    company_name: string;
    company_summary: string;
    industry: string;
    revenue_range: string;
    employee_range: string;
    location: string;
    key_person_name: string;
    key_person_summary: string;
    email: string;
    lead_status: "Hot" | "Warm" | "Cold";
    conversation_summary: string;
    created_at: string;
    phone: string;
    card_details: string;
    next_steps_details: string;
    next_step_date: string;
};

const differenceInDays = (startDate: Date, endDate: Date) => {
    const diff = endDate.getTime() - startDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export default function LeadScreen() {
    const iconColor = useThemeColor({}, "text");
    const { id } = useLocalSearchParams() as { id: string };

    const [leadData, setLeadData] = useState<leadData | undefined>(undefined);

    useEffect(() => {
        const fecthLeadData = async (id: string) => {
            const res = await axiosInstance.get(`/leads?id=eq.${id}`);

            setLeadData(res.data[0]);
        };

        fecthLeadData(id);
    }, [id]);

    const redirectToLeads = () => {
        router.back();
    };

    return (
        <ThemedSafeAreaView
            style={styles.safeAreaContainer}
            lightColor="#2B3951"
            darkColor="#2B3951"
        >
            <Header />
            <ThemedScrollView>
                <ThemedView style={styles.container}>
                    {leadData === undefined ? (
                        <ActivityIndicator
                            size="large"
                            color="#2B3951"
                            style={styles.loader}
                        />
                    ) : (
                        <>
                            <ThemedView style={styles.headingFlex}>
                                <ThemedText textType="title">Leads</ThemedText>
                                <Entypo
                                    name="menu"
                                    size={32}
                                    color={iconColor}
                                />
                            </ThemedView>
                            <ThemedView style={styles.seperator} />

                            {leadData && (
                                <ThemedView style={styles.dataContainer}>
                                    <ThemedView style={styles.horizontalFlex}>
                                        <ThemedView
                                            style={styles.textContainer}
                                        >
                                            <ThemedText textType="subtitle">
                                                {leadData.company_name}
                                            </ThemedText>
                                            <ThemedText>
                                                {leadData.location}
                                            </ThemedText>

                                            <ThemedView style={styles.timeFlex}>
                                                <MaterialCommunityIcons
                                                    name="clock"
                                                    size={16}
                                                    color={iconColor}
                                                />
                                                <ThemedText>
                                                    {differenceInDays(
                                                        new Date(
                                                            leadData.created_at
                                                        ),
                                                        new Date()
                                                    )
                                                        ? `${differenceInDays(
                                                              new Date(
                                                                  leadData.created_at
                                                              ),
                                                              new Date()
                                                          )} days old`
                                                        : "Today"}
                                                </ThemedText>
                                            </ThemedView>
                                        </ThemedView>

                                        <ThemedView style={styles.iconFlex}>
                                            <ThemedView>
                                                <LeadStatus
                                                    lead_status={
                                                        leadData.lead_status
                                                    }
                                                />
                                            </ThemedView>
                                            <ThemedPressable
                                                onPress={() =>
                                                    redirectToLeads()
                                                }
                                            >
                                                <Entypo
                                                    name="cross"
                                                    size={30}
                                                    color={iconColor}
                                                    style={styles.crossIcon}
                                                />
                                            </ThemedPressable>
                                        </ThemedView>
                                    </ThemedView>

                                    <ThemedView style={styles.sectionContainer}>
                                        <ThemedView
                                            style={styles.recordingContainer}
                                            type="secondaryBackground"
                                        >
                                            <MaterialCommunityIcons
                                                name="play-circle"
                                                size={32}
                                                color={iconColor}
                                            />
                                            <ThemedView
                                                style={styles.recordingBar}
                                                type="ternaryBackground"
                                            />
                                            <ThemedText>36m</ThemedText>
                                        </ThemedView>

                                        <People data={leadData} />
                                        <BackgroundInfo data={leadData} />
                                        <ConversationSummary data={leadData} />
                                        <Notes data={leadData} />
                                        <CustomerEngagement data={leadData} />
                                    </ThemedView>
                                </ThemedView>
                            )}
                        </>
                    )}
                </ThemedView>
            </ThemedScrollView>
        </ThemedSafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    loader: {
        alignSelf: "center",
        top: "50%",
    },
    headingFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        marginVertical: 10,
    },
    seperator: {
        width: "100%",
        height: 1,
        backgroundColor: "#D9D9D9",
    },
    dataContainer: {
        flex: 1,
        paddingHorizontal: 24,
        marginTop: 20,
    },
    horizontalFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textContainer: {
        flex: 1,
    },
    timeFlex: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        gap: 8,
    },
    iconFlex: {
        flexDirection: "row",
        gap: 8,
        alignItems: "flex-start",
    },
    crossIcon: {
        marginTop: -4,
    },
    sectionContainer: {
        flexDirection: "column",
        gap: 10,
        marginVertical: 24,
    },
    recordingContainer: {
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        gap: 10,
    },
    recordingBar: {
        flex: 1,
        height: 4,
        borderRadius: 2,
    },
});

const commonStyles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#C1C1C1",
        padding: 8,
    },
    input: { textAlignVertical: "top" },
    highlightPressable: {
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
    },
});

type peopleProps = {
    data: {
        key_person_name: string;
    };
};

const People = (props: peopleProps) => {
    const leadData = props.data;

    return (
        <ThemedView
            style={peopleStyles.peopleContainer}
            type="secondaryBackground"
        >
            <ThemedText textType="subtitle">People</ThemedText>

            <ThemedView
                style={peopleStyles.personFlex}
                type="secondaryBackground"
            >
                <ThemedView style={peopleStyles.personIcon}>
                    <ThemedText lightColor="#fff" darkColor="#fff">
                        AS
                    </ThemedText>
                </ThemedView>
                <ThemedText>{leadData.key_person_name}</ThemedText>
            </ThemedView>
        </ThemedView>
    );
};

const peopleStyles = StyleSheet.create({
    peopleContainer: {
        padding: 20,
        borderRadius: 10,
        flexDirection: "column",
        gap: 10,
    },
    personFlex: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    personIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#2A3950",
        justifyContent: "center",
        alignItems: "center",
    },
});

type backgroundInfoProps = {
    data: {
        company_name: string;
        company_summary: string;
        industry: string;
        revenue_range: string;
        employee_range: string;
        key_person_name: string;
        key_person_summary: string;
    };
};

const BackgroundInfo = (props: backgroundInfoProps) => {
    const leadData = props.data;
    const [backgroundInfoState, setBackgroundInfoState] = useState<number>(0);

    const changeBackgroundInfoState = (newState: number) => {
        setBackgroundInfoState(newState);
    };

    return (
        <ThemedView
            style={backgroundInfoStyles.backgroundContainer}
            type="secondaryBackground"
        >
            <ThemedText textType="subtitle">Background Research</ThemedText>

            <ThemedView
                style={backgroundInfoStyles.toggleContainer}
                type="ternaryBackground"
            >
                <ThemedPressable
                    style={backgroundInfoStyles.toggleButton}
                    type={
                        backgroundInfoState == 0
                            ? "secondaryBackground"
                            : "ternaryBackground"
                    }
                    onPress={() => changeBackgroundInfoState(0)}
                >
                    <ThemedText>Company</ThemedText>
                </ThemedPressable>
                <ThemedPressable
                    style={backgroundInfoStyles.toggleButton}
                    type={
                        backgroundInfoState == 1
                            ? "secondaryBackground"
                            : "ternaryBackground"
                    }
                    onPress={() => changeBackgroundInfoState(1)}
                >
                    <ThemedText>Person</ThemedText>
                </ThemedPressable>
            </ThemedView>

            <ThemedView
                type="secondaryBackground"
                style={{
                    ...backgroundInfoStyles.backgroundDataContainer,
                    ...styles.textContainer,
                }}
            >
                {backgroundInfoState == 0 ? (
                    <>
                        <ThemedText textType="defaultSemiBold">
                            {leadData.company_name}
                        </ThemedText>
                        <ThemedText>{leadData.company_summary}</ThemedText>
                        <ThemedView
                            type="secondaryBackground"
                            style={backgroundInfoStyles.companyDetailsFlex}
                        >
                            <ThemedText>
                                {`Industry: ${leadData.industry}`}
                            </ThemedText>
                            <ThemedText>
                                {`Revenue: ${leadData.revenue_range}`}
                            </ThemedText>
                            <ThemedText>
                                {`Employees: ${leadData.employee_range}`}
                            </ThemedText>
                        </ThemedView>
                    </>
                ) : (
                    <>
                        <ThemedText textType="defaultSemiBold">
                            {leadData.key_person_name}
                        </ThemedText>
                        <ThemedText>{leadData.key_person_summary}</ThemedText>
                    </>
                )}
            </ThemedView>
        </ThemedView>
    );
};

const backgroundInfoStyles = StyleSheet.create({
    backgroundContainer: {
        padding: 20,
        borderRadius: 10,
        flexDirection: "column",
        gap: 10,
    },
    toggleContainer: {
        padding: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        borderRadius: 8,
    },
    toggleButton: {
        width: "49%",
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    backgroundDataContainer: {
        flexDirection: "column",
        gap: 4,
    },
    companyDetailsFlex: {
        marginTop: 8,
        flexDirection: "column",
        gap: 4,
    },
});

type conversationSummaryProps = {
    data: {
        conversation_summary: string;
        next_step_date: string;
        next_steps_details: string;
    };
};

const ConversationSummary = (props: conversationSummaryProps) => {
    const leadData = props.data;
    const iconColor = useThemeColor({}, "text");

    return (
        <ThemedView
            style={conversationSummaryStyles.conversationContainer}
            type="secondaryBackground"
        >
            <ThemedText textType="subtitle">Conversation Summary</ThemedText>

            <ThemedScrollView
                horizontal
                style={conversationSummaryStyles.conversationTagFlex}
                contentContainerStyle={
                    conversationSummaryStyles.conversationTagFlexContainer
                }
                type="secondaryBackground"
            >
                <ConversationTag tag_text="Pricing" />
                <ConversationTag tag_text="Integration" />
                <ConversationTag tag_text="Delivery " />
            </ThemedScrollView>

            <ThemedText type="mutedText">
                {leadData.conversation_summary}
            </ThemedText>

            <ThemedView style={styles.seperator} />

            <ThemedText textType="defaultSemiBold">Next Steps</ThemedText>

            <ThemedView
                style={conversationSummaryStyles.nextSetpContainer}
                type="ternaryBackground"
            >
                <ThemedText>{leadData.next_step_date}</ThemedText>
                <ThemedView
                    style={conversationSummaryStyles.nextStepTextContainer}
                    type="ternaryBackground"
                >
                    <ThemedText>{leadData.next_steps_details}</ThemedText>
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.seperator} />

            <ThemedText textType="defaultSemiBold">Attachments</ThemedText>

            <ThemedView
                style={conversationSummaryStyles.attachmentContainer}
                type="secondaryBackground"
            >
                <Entypo name="attachment" size={14} color={iconColor} />
                <ThemedText>Business card - Ajay Sharma</ThemedText>
            </ThemedView>
            <ThemedView
                style={conversationSummaryStyles.attachmentContainer}
                type="secondaryBackground"
            >
                <Entypo name="attachment" size={14} color={iconColor} />
                <ThemedText>Company pamphlet</ThemedText>
            </ThemedView>

            <ThemedPressable
                style={conversationSummaryStyles.addAttachmentPressable}
            >
                <ThemedText>+ Add Attachment</ThemedText>
            </ThemedPressable>
        </ThemedView>
    );
};

const conversationSummaryStyles = StyleSheet.create({
    conversationContainer: {
        padding: 20,
        borderRadius: 10,
        flexDirection: "column",
        gap: 10,
    },
    conversationTagFlex: {
        flex: 1,
    },
    conversationTagFlexContainer: {
        flexDirection: "row",
        gap: 8,
    },
    nextSetpContainer: {
        flexDirection: "row",
        gap: 20,
        padding: 10,
        borderRadius: 10,
    },
    nextStepTextContainer: {
        flex: 1,
    },
    attachmentContainer: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    addAttachmentPressable: {
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D9D9D9",
        borderRadius: 8,
    },
});

type notesProps = {
    data: {
        company_name: string;
        key_person_name: string;
        conversation_summary: string;
    };
};

const Notes = (props: notesProps) => {
    const leadData = props.data;

    const [note, setNote] = useState("");

    return (
        <ThemedView
            style={notesStyles.notesContainer}
            type="secondaryBackground"
        >
            <ThemedText textType="subtitle">Notes</ThemedText>

            <ThemedView
                style={notesStyles.noteContainer}
                type="ternaryBackground"
            >
                <ThemedText>
                    Initial client meeting went well. Ajay expressed interest in
                    our new alloy processing technology. Follow up on
                    integration possibilities with their existing systems.
                </ThemedText>
                <ThemedText type="mutedText" textType="small">
                    7-Nov-2024
                </ThemedText>
            </ThemedView>

            <ThemedView
                style={commonStyles.inputContainer}
                type="secondaryBackground"
            >
                <ThemedTextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    onChangeText={(text) => setNote(text)}
                    value={note}
                    style={commonStyles.input}
                    placeholder="Add your personal notes here..."
                />
            </ThemedView>

            <ThemedPressable
                style={commonStyles.highlightPressable}
                type="highlight"
            >
                <ThemedText lightColor="#fff" darkColor="#fff">
                    Save Note
                </ThemedText>
            </ThemedPressable>
        </ThemedView>
    );
};

const notesStyles = StyleSheet.create({
    notesContainer: {
        padding: 20,
        borderRadius: 10,
        flexDirection: "column",
        gap: 10,
    },
    noteContainer: {
        borderRadius: 10,
        padding: 8,
        flexDirection: "column",
        gap: 8,
    },
});

type customerEngagementProps = {
    data: {
        email: string;
        phone: string;
    };
};

const CustomerEngagement = (props: customerEngagementProps) => {
    const leadData = props.data;
    const iconColor = useThemeColor({}, "text");

    const [engagementText, setEngagementText] = useState("");

    return (
        <ThemedView
            style={customerEngagementStyles.customerEngagementContainer}
            type="secondaryBackground"
        >
            <ThemedText textType="subtitle">Customer Engagement</ThemedText>
            <ThemedView
                style={customerEngagementStyles.engagementPressableFlex}
                type="secondaryBackground"
            >
                <ThemedPressable
                    style={customerEngagementStyles.engagementPressable}
                    type="primaryBackground"
                >
                    <ThemedView style={customerEngagementStyles.engagementFlex}>
                        <MaterialCommunityIcons
                            name="email"
                            size={20}
                            color={iconColor}
                        />
                        <ThemedText>Email</ThemedText>
                    </ThemedView>
                </ThemedPressable>
                <ThemedPressable
                    style={customerEngagementStyles.engagementPressable}
                >
                    <ThemedView style={customerEngagementStyles.engagementFlex}>
                        <MaterialCommunityIcons
                            name="whatsapp"
                            size={20}
                            color={iconColor}
                        />
                        <ThemedText>WhatsApp</ThemedText>
                    </ThemedView>
                </ThemedPressable>
            </ThemedView>
            <ThemedView
                style={commonStyles.inputContainer}
                type="secondaryBackground"
            >
                <ThemedTextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    onChangeText={(text) => setEngagementText(text)}
                    value={engagementText}
                    style={commonStyles.input}
                    placeholder="Send messages to keep leads engaged!"
                />
            </ThemedView>
            <ThemedPressable
                style={commonStyles.highlightPressable}
                type="highlight"
            >
                <ThemedText lightColor="#fff" darkColor="#fff">
                    Send Message
                </ThemedText>
            </ThemedPressable>
        </ThemedView>
    );
};

const customerEngagementStyles = StyleSheet.create({
    customerEngagementContainer: {
        padding: 20,
        borderRadius: 10,
        flexDirection: "column",
        gap: 10,
    },
    engagementPressableFlex: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: 10,
    },
    engagementPressable: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#C1C1C1",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
    },
    engagementFlex: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
});
