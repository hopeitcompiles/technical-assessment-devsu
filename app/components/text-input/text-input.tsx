import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import { COLORS } from "../../theme/colors";

interface IInputProps extends TextInputProps {
  label?: string;
  error?: string;
  errorStyle?: TextStyle;
  labelStyle?: TextStyle;
  keepErrorMargin?: boolean;
}

export default function textInput({
  error,
  label,
  readOnly,
  labelStyle,
  errorStyle,
  keepErrorMargin = true,
  ...restOfProps
}: IInputProps) {
  const customStyle: TextStyle = {};
  if (error) {
    customStyle.borderColor = COLORS.danger;
  }
  if (readOnly) {
    customStyle.backgroundColor = COLORS.lightgray;
  }

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        style={[styles.input, customStyle]}
        readOnly={readOnly}
        {...restOfProps}
      />
      {(error || keepErrorMargin) && (
        <Text style={[styles.error, errorStyle]}>{error ?? ""}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.gray,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    width: "100%",
  },
  error: {
    color: COLORS.danger,
    fontSize: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 3,
  },
});
