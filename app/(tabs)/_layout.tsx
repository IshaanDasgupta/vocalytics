import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: true,
            }}
        >
            <Tabs.Screen
                name="leads"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "people" : "people-outline"}
                            color={color}
                            size={25}
                        />
                    ),
                    tabBarLabel: "Leads",
                }}
            />
            <Tabs.Screen
                name="recordings"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "mic" : "mic-outline"}
                            color={color}
                            size={25}
                        />
                    ),
                    tabBarLabel: "Recordings",
                }}
            />
        </Tabs>
    );
}
