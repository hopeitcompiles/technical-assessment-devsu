import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ToastAndroid,
  Platform,
} from "react-native";
import { Button, ButtonGroup, Text } from "../../../../../custom-export";
import { COLORS } from "../../../../theme/colors";
import product_service from "../../../../services/product/product-service";
import { useNavigation } from "@react-navigation/native";
import { ProductStackParamList } from "../../../../navigation/product-navigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BusinessError } from "../../../../classes/error";
import { Icons } from "../../../../components/icons/icons";
import { COMMON_MESSAGES } from "../../../../constants/messages";

type DeleteProps = {
  id?: string;
  name?: string;
  onClose?: () => void;
};

export default function DeleteProduct({ id, name, onClose }: DeleteProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProductStackParamList>>();

  function handleGoToHome() {
    navigation.navigate("ProductHome", {
      update: new Date().toLocaleTimeString(),
    });
  }

  function handleDeleteProduct() {
    if (id) {
      setLoading(true);
      product_service
        .delete(id)
        .then(() =>
          Alert.alert(
            "Producto eliminado",
            undefined,
            [
              {
                onPress: handleGoToHome,
                text: COMMON_MESSAGES.ACCEPT_BUTTON,
              },
            ],
            {
              onDismiss: handleGoToHome,
              cancelable: true,
            }
          )
        )
        .catch((e) => {
          if (e instanceof BusinessError) {
            if (Platform.OS === "android") {
              ToastAndroid.showWithGravity(
                e.message,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
            }
            setError(e.message);
            return;
          }
          setError("Se ha producido un error");
        })
        .finally(() => setLoading(false));
    }
  }

  return (
    <Modal
      onRequestClose={onClose}
      transparent={true}
      visible={id ? true : false}
      animationType="fade"
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.content}>
        <View style={styles.close}>
          <Button onPress={onClose} style={styles.button}>
            <Icons.Close />
          </Button>
        </View>
        <View style={styles.questionContainer}>
          <Text align="center" size="subtitle">
            ¿Estás seguro de eliminar el producto {`${name}`}?
          </Text>
          {error && (
            <Text align="center" color={COLORS.danger}>
              {error}
            </Text>
          )}
        </View>
        <ButtonGroup style={styles.buttonContainer}>
          <Button
            variant="primary"
            onPress={handleDeleteProduct}
            loading={loading}
          >
            {COMMON_MESSAGES.CONFIRM_BUTTON}
          </Button>
          <Button onPress={onClose}>{COMMON_MESSAGES.CANCEL_BUTTON}</Button>
        </ButtonGroup>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: "100%",
    position: "absolute",
    bottom: 0,
    gap: 20,
  },
  close: {
    justifyContent: "flex-end",
    borderBottomColor: COLORS.lightgray,
    borderBottomWidth: 1,
    padding: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  button: {
    width: 40,
    height: 40,
    padding: 0,
    borderRadius: 100,
    alignSelf: "flex-end",
  },
  questionContainer: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 10,
    gap: 10,
  },
  buttonContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightgray,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
});
