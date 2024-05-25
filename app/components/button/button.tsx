import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { COLORS } from "../../theme/colors";

interface IButtonProps extends ViewProps {
  children: string | ReactNode;
  variant?: "default" | "primary" | "danger";
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function button({
  children,
  variant = "default",
  disabled,
  onPress,
  style,
  loading,
  ...restOfProps
}: IButtonProps) {
  let child: ReactNode = children;
  if (typeof children === "string") {
    const color = variant === "danger" ? "white" : "black";
    child = (
      <Text
        style={{
          color: disabled ? COLORS.gray : color,
        }}
      >
        {children}
      </Text>
    );
  }
  const customStyle: ViewStyle = {
    backgroundColor: disabled ? COLORS.lightgray : COLORS[variant],
  };

  return (
    <TouchableNativeFeedback onPress={onPress} disabled={disabled || loading}>
      <View
        style={[
          styles.container,
          customStyle,
          style,
          loading && { paddingVertical: 6.5 },
        ]}
        {...restOfProps}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={COLORS.gray} />
        ) : (
          child
        )}
      </View>
    </TouchableNativeFeedback>
  );
}

interface ButtonGroupProps extends ViewProps {
  children: ReactNode;
}
export function buttonGroup({
  children,
  style,
  ...restOfProps
}: ButtonGroupProps) {
  return (
    <View style={[styles.buttonContainer, style]} {...restOfProps}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
    shadowColor: "black",
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.lightgray,
  },
  buttonContainer: {
    gap: 8,
    paddingVertical: 10,
    width: "100%",
  },
});
