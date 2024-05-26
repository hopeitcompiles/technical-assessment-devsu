import React, { Key } from "react";
import Header from "../components/header/header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductHomeScreen from "../screens/product/home/product-home";
import ProductDetailScreen from "../screens/product/detail/product-detail";
import { Product } from "../interfaces/Product";
import ProductCreate from "../screens/product/create/product-create";

export type ProductStackParamList = {
  ProductHome: { update?: Key } | undefined;
  ProductDetail: { product: Product; shouldUpdateOnBack?: boolean };
  ProductCreate: { product: Product } | undefined;
};

const ProductStack = createNativeStackNavigator();

export default function ProductNavigator() {
  return (
    <>
      <Header />
      <ProductStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="ProductHome"
      >
        <ProductStack.Screen
          name={"ProductHome"}
          component={ProductHomeScreen}
        />
        <ProductStack.Screen
          name={"ProductDetail"}
          component={ProductDetailScreen}
        />
        <ProductStack.Screen name={"ProductCreate"} component={ProductCreate} />
      </ProductStack.Navigator>
    </>
  );
}
