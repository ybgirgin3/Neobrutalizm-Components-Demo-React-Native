import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NBButton from "../neub/NBButton";
import { IconSymbol } from "../ui/icon-symbol.ios";

const Header = () => {
  return (
    <SafeAreaView
      style={{
        // flex: 1,
        // width: "100%",
        // height: 20,
        // backgroundColor: "yellow",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      {/* pp and greetings text */}
      <View
        style={{
          width: "70%",
          height: 100,
          //   backgroundColor: "purple",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {/* pp */}
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
            // backgroundColor: "green",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <NBButton
            width={55}
            height={55}
            style={{ borderRadius: 100, shadowColor: "blue" }}
          >
            <Text>B</Text>
          </NBButton>
        </View>
        <View
          style={{
            width: "80%",
            height: "100%",
            // backgroundColor: "lightblue",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <Text style={{ fontSize: 28, color: "black" }}>Welcome, Berkay!</Text>
        </View>
      </View>
      {/* Notification */}
      <View
        style={{
          width: "30%",
          justifyContent: "center",
          alignItems: "center",
          //   backgroundColor: "blue",
        }}
      >
        <NBButton width={50}>
          <IconSymbol name="bell" color="black" />
        </NBButton>
      </View>
    </SafeAreaView>
  );
};

export default Header;
