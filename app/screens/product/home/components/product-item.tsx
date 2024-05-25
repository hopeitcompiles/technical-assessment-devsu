import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../../../../../custom-export";
import { COLORS } from "../../../../theme/colors";
import { Icons } from "../../../../components/icons/icons";

type ItemProps = {
  name: string;
  id: string;
};

const ProductItem = React.memo(({ id, name }: ItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text weight="bold">{name}</Text>
        <Text style={{ color: COLORS.gray }}>ID: {id}</Text>
      </View>
      <Icons.ChevronRight width={15} height={15} fill={COLORS.gray} />
    </View>
  );
});

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 12,
  },
  details: {
    flex: 2,
    marginRight: 10,
  },
});
