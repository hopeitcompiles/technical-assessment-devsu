import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  BackHandler,
  NativeEventSubscription,
  StyleSheet,
  View,
} from "react-native";
import { ProductStackParamList } from "../../../navigation/product-navigator";
import {
  Button,
  ButtonGroup,
  Container,
  Image,
  Split,
  Text,
} from "../../../../custom-export";
import { COLORS } from "../../../theme/colors";
import { dateFormat } from "../../../utils/date-convertions";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DeleteProduct from "./components/delete";
import { COMMON_MESSAGES } from "../../../constants/messages";

export default function ProductDetailScreen() {
  const route = useRoute<RouteProp<ProductStackParamList, "ProductDetail">>();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProductStackParamList>>();
  const product = route.params?.product;
  const [toDelete, setToDelete] = useState<{ name: string; id: string }>();
  const backListenerRef = useRef<NativeEventSubscription>();
  const blurListenerRef = useRef<() => void>();
  const focusListenerRef = useRef<() => void>();

  function handlePressEdit() {
    if (product) {
      navigation.navigate("ProductCreate", { product });
    }
  }

  function handlePressDelete() {
    if (product) {
      setToDelete({ name: product.name, id: product.id });
    }
  }

  const handleBackPress = useCallback(() => {
    const { shouldUpdateOnBack } = route.params;

    navigation.navigate("ProductHome", {
      update: shouldUpdateOnBack ? new Date().toLocaleTimeString() : undefined,
    });
    backListenerRef.current?.remove();
    return true;
  }, [route.params.shouldUpdateOnBack]);

  useEffect(() => {
    blurListenerRef.current = navigation.addListener("blur", () => {
      backListenerRef.current?.remove();
    });

    focusListenerRef.current = navigation.addListener("focus", () => {
      backListenerRef.current = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );

      return () => backListenerRef.current?.remove();
    });

    return () => {
      blurListenerRef.current && blurListenerRef.current();
      focusListenerRef.current && focusListenerRef.current();
    };
  }, [navigation, handleBackPress]);

  if (!product) {
    return (
      <Container>
        <Text>Ha ocurrido un error</Text>
        <Button>{COMMON_MESSAGES.BACK_BUTTON}</Button>
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.heading}>
        <Text size="title">ID: {product.id}</Text>
        <Text style={styles.information}>Información extra</Text>
      </View>

      <View style={styles.details}>
        <Split>
          <Text>Nombre</Text>
          <Text align="right">{product.name}</Text>
        </Split>
        <Split>
          <Text>Descripción</Text>
          <Text align="right">{product.description}</Text>
        </Split>

        <View>
          <Text align="left" style={{ width: "100%" }}>
            Logo
          </Text>
          <Image style={styles.logo} source={{ uri: product.logo }} />
        </View>

        <Split>
          <Text>Fecha liberación</Text>
          <Text align="right">
            {dateFormat.simple(product.date_release?.toString())}
          </Text>
        </Split>
        <Split>
          <Text>Fecha revisión</Text>
          <Text align="right">
            {dateFormat.simple(product.date_revision?.toString())}
          </Text>
        </Split>
      </View>
      <ButtonGroup style={{ marginTop: "auto" }}>
        <Button onPress={handlePressEdit}>{COMMON_MESSAGES.EDIT_BUTTON}</Button>
        <Button onPress={handlePressDelete} variant="danger">
          {COMMON_MESSAGES.DELETE_BUTTON}
        </Button>
      </ButtonGroup>
      <DeleteProduct {...toDelete} onClose={() => setToDelete(undefined)} />
    </Container>
  );
}

const styles = StyleSheet.create({
  information: { color: COLORS.gray },
  details: { paddingHorizontal: 10, gap: 10 },
  logo: {
    width: 200,
    height: 150,
    maxWidth: "80%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  heading: {
    paddingVertical: 30,
  },
});
