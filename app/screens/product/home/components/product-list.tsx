import React from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "../../../../../custom-export";
import { Product } from "../../../../interfaces/Product";
import ProductItem from "./product-item";
import { COLORS } from "../../../../theme/colors";
import { ERROR_MESSAGES } from "../../../../constants/messages";

interface ListProps {
  products?: Product[];
  onProductSelection?: (product: Product) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  style?: ViewStyle;
}

const list = React.memo(
  ({
    products,
    onProductSelection,
    onRefresh,
    style,
    isRefreshing = false,
  }: ListProps) => {
    return (
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        data={products}
        keyExtractor={(e, index) => `${e.id}-${index}`}
        renderItem={({ item: product }) => (
          <TouchableOpacity
            onPress={() => {
              if (onProductSelection) onProductSelection(product);
            }}
          >
            <ProductItem id={product.id} name={product.name} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: COLORS.gray }} />
        )}
        contentContainerStyle={[
          products?.length !== 0 && styles.listContainer,
          style,
        ]}
        ListEmptyComponent={
          <Text size="subtitle" align="center">
            {ERROR_MESSAGES.NO_PRODUCTS_TO_DISPLAY}
          </Text>
        }
      />
    );
  }
);
export default list;

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
  },
});
