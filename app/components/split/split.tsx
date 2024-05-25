import React, { ReactNode } from "react";
import { View } from "react-native";

type SplitProps = {
  children: ReactNode[];
};

export default function split({ children }: SplitProps) {
  return (
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        gap: 10,
      }}
    >
      {React.Children.map(children, (child, index) => (
        <View
          style={{
            flex: 1,
          }}
          key={index}
        >
          {child}
        </View>
      ))}
    </View>
  );
}
