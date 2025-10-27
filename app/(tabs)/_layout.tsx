import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import NBButton from "@/components/neub/NBButton";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Dimensions, StyleSheet, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const SCREEN = Dimensions.get("screen");

  const TabIcon =
    (name: string) =>
    ({ color, focused }: { color: string; focused: boolean }) =>
      (
        <View style={[styles.iconContainer]}>
          <NBButton
            width={80}
            useTouchable={false}
            style={[
              {
                borderRadius: 50,
                backgroundColor: "white",
                borderColor: "#00000085",
                shadowColor: "#00000070"
              },
              focused && styles.iconBgActive,
            ]}
          >
            <IconSymbol
              size={30}
              name={name as any}
              color={focused ? "#ffffffff" : color}
            />
          </NBButton>
          {/* <View style={[styles.iconBg, focused && styles.iconBgActive]}>
            <IconSymbol
              size={30}
              name={name as any}
              color={focused ? "#ffffffff" : color}
            />
          </View> */}
        </View>
      );

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: "white",
        headerShown: false,
        tabBarButton: HapticTab,
        animation: "fade",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          borderRadius: 50,
          // borderWidth: 3,
          // borderColor: "black",
          width: "90%",
          // height: 80,
          marginHorizontal: "5%",
          bottom: 25,
          // elevation: 8,
          // shadowColor: "000",
          // shadowOffset: { width: 0, height: -2 },
          // shadowOpacity: 0.1,
          // shadowRadius: 8,
        },
        tabBarIconStyle: {
          top: 20,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            tint="light"
            style={{
              flex: 1,
              borderRadius: 50,
              backgroundColor: "#ffffff13",
              overflow: "hidden",
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "House",
          tabBarIcon: TabIcon("house.fill"),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: TabIcon("macbook"),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: TabIcon("heart"),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: TabIcon("gearshape"),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBg: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBgActive: {
    // neubrutal active pill: fill + border + shadow + slight lift
    width: 70,
    height: 70,
    backgroundColor: "#00cef7c8",
    borderWidth: 0,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    borderColor: "#000",
  },
});
