import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../../../custom-export";
import { COLORS } from "../../theme/colors";
import { Icons } from "../icons/icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <Icons.MoneyBill />
      <Text size="subtitle" weight="bold">
        BANCO
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightgray,
  },
});
