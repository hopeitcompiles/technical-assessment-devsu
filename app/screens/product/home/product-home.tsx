import React, { useEffect } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import ProductList from "./components/product-list";
import useProductList from "../../../hooks/useProducts/useProducts";
import {
  Button,
  Container,
  Skeleton,
  Text,
  TextInput,
} from "../../../../custom-export";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Product } from "../../../interfaces/Product";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProductStackParamList } from "../../../navigation/product-navigator";
import { COLORS } from "../../../theme/colors";
import { COMMON_MESSAGES } from "../../../constants/messages";

export default function ProductHomeScreen() {
  const route = useRoute<RouteProp<ProductStackParamList, "ProductHome">>();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProductStackParamList>>();
  const update = route.params?.update;

  const { isLoading, productList, searchProduct, error, reloadProducts } =
    useProductList();

  function handleProductSelection(product: Product) {
    navigation.navigate("ProductDetail", { product });
  }

  function handlePressCreate() {
    navigation.navigate("ProductCreate");
  }

  useEffect(() => {
    if (update) {
      reloadProducts();
    }
  }, [update]);

  if (error) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={reloadProducts} />
        }
        contentContainerStyle={styles.errorContainer}
      >
        <Text
          color={COLORS.danger}
          size="subtitle"
          align="center"
          weight="bold"
        >
          {error}
        </Text>
        <Button onPress={reloadProducts} loading={isLoading}>
          {COMMON_MESSAGES.RETRY_BUTTON}
        </Button>
      </ScrollView>
    );
  }

  return (
    <Container style={styles.container}>
      <TextInput
        placeholder={COMMON_MESSAGES.SEARCH_PLACEHOLDER}
        onChangeText={searchProduct}
      />
      {isLoading ? (
        <View style={styles.skeletonContainer}>
          {Array.from({ length: 6 }).map((e, index) => {
            return <Skeleton key={index} style={styles.skeleton} />;
          })}
        </View>
      ) : (
        <ProductList
          products={productList}
          onProductSelection={handleProductSelection}
          onRefresh={reloadProducts}
        />
      )}
      <Button
        onPress={handlePressCreate}
        style={styles.button}
        variant="primary"
        disabled={isLoading}
      >
        {COMMON_MESSAGES.ADD_BUTTON}
      </Button>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingVertical: 10,
  },
  errorContainer: {
    flex: 1,
    padding: 20,
    gap: 20,
    justifyContent: "center",
  },
  skeletonContainer: { width: "100%", gap: 4 },
  skeleton: { height: 60 },
  button: { marginTop: "auto" },
});
