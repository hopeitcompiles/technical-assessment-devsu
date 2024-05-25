import React, { ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface ContainerProps extends ViewProps {
  children: ReactNode;
}

export default function container({
  children,
  style,
  ...restOfProps
}: ContainerProps) {
  return (
    <View style={[styles.container, style]} {...restOfProps}>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
});
