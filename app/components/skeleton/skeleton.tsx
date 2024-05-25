import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { COLORS } from "../../theme/colors";

type SkeletonProps = { style?: ViewStyle };

export default function skeleton({ style }: SkeletonProps) {
  return <View testID="skeleton" style={[styles.container, style]} />;
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 10,
    backgroundColor: COLORS.lightgray,
    overflow: "hidden",
    borderRadius: 5,
  },
});
