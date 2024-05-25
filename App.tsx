import { StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import ProductNavigator from "./app/navigation/product-navigator";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"dark-content"} />
      <ProductNavigator />
    </NavigationContainer>
  );
}
