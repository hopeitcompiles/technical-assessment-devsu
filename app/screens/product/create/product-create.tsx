import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import {
  Button,
  ButtonGroup,
  Container,
  Text,
  TextInput,
} from "../../../../custom-export";
import { Product } from "../../../interfaces/Product";
import { dateFormat } from "../../../utils/date-convertions";
import useFormData from "../../../hooks/useFormData/useFormData";
import { PRODUCT_YUP_SCHEMA } from "./validation/yup-product";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ProductStackParamList } from "../../../navigation/product-navigator";
import product_service from "../../../services/product/product-service";
import {
  BusinessError,
  BusinessErrorCodes,
  CustomError,
} from "../../../classes/error";
import { COMMON_MESSAGES } from "../../../constants/messages";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function ProductCreateScreen() {
  const route = useRoute<RouteProp<ProductStackParamList, "ProductCreate">>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ProductStackParamList, "ProductCreate">
    >();
  const product = route.params?.product;
  const [isLoading, setIsLoading] = useState(false);

  const {
    values,
    errors,
    modified,
    handleChange,
    clearFormData,
    submitFormData,
  } = useFormData<Product>({
    schema: PRODUCT_YUP_SCHEMA,
    initialValues: product
      ? { ...product, date_release: dateFormat.simple(product.date_release) }
      : undefined,
    validateOnChange: true,
    onSubmit: submitForm,
  });

  async function submitForm(values: Product) {
    try {
      setIsLoading(true);
      const date_release = dateFormat.getDateOrNull(values.date_release);
      if (!date_release) {
        throw new CustomError("Fecha de iiberación no válida");
      }
      const date_revision = dateFormat.getDateOrNull(values.date_revision);
      if (!date_revision) {
        throw new CustomError("Fecha de revisión no válida");
      }
      const inputValues = { ...values, date_release, date_revision };

      if (!product) {
        const doesExist = await product_service.verifyIfExists(values.id);
        if (doesExist) {
          throw new BusinessError(BusinessErrorCodes.PRODUCT_ALREADY_EXIST);
        }
        await product_service.create(inputValues);
      } else {
        await product_service.update(values);
      }
      const serialized = {
        ...values,
        date_release: values.date_release.toString(),
        date_revision: values.date_revision.toString(),
      };
      Alert.alert(
        `Producto ${product ? "actualizado" : "creado"}`,
        undefined,
        [
          {
            onPress: () =>
              product
                ? navigation.navigate("ProductDetail", {
                    product: serialized as any,
                    shouldUpdateOnBack: true,
                  })
                : navigation.replace("ProductDetail", {
                    product: serialized as any,
                    shouldUpdateOnBack: true,
                  }),

            text: COMMON_MESSAGES.ACCEPT_BUTTON,
          },
        ],
        {
          cancelable: false,
        }
      );
    } catch (e) {
      if (e instanceof CustomError) {
        Alert.alert(e.message);
      } else {
        Alert.alert("Se ha producido un error, vuelve a intentar");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleChangeDate(value: string) {
    const _date = dateFormat.getDateOrNull(value.replaceAll("/", "-"));
    const values: any = [value];
    if (_date) {
      _date.setFullYear(_date.getFullYear() + 1);
      values.push(_date);
    }
    handleChange(["date_release", "date_revision"], values);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Container>
        <Text size="title" weight="bolder" style={styles.title}>
          Formulario de Registro
        </Text>
        <TextInput
          label="ID"
          onChangeText={(e) => {
            handleChange("id", e);
          }}
          editable={!product}
          value={values.id}
          maxLength={10}
          error={errors.id}
          testID="id"
        />
        <TextInput
          label="Nombre"
          maxLength={100}
          onChangeText={(e) => {
            handleChange("name", e);
          }}
          value={values.name}
          error={errors.name}
          testID="name"
        />
        <TextInput
          label="Descripción"
          maxLength={300}
          onChangeText={(e) => {
            handleChange("description", e);
          }}
          value={values.description}
          error={errors.description}
          testID="description"
        />
        <TextInput
          label="Logo"
          onChangeText={(e) => {
            handleChange("logo", e);
          }}
          keyboardType="url"
          value={values.logo}
          error={errors.logo}
          testID="logo"
        />
        <TextInput
          label="Fecha Liberación"
          keyboardType="numbers-and-punctuation"
          onChangeText={handleChangeDate}
          value={values.date_release as string}
          error={errors.date_release}
          placeholder={dateFormat.simple(new Date())}
          testID="date_release"
        />
        <TextInput
          label="Fecha Revisión"
          readOnly
          value={
            values.date_revision && dateFormat.simple(values?.date_revision)
          }
          error={values.date_revision && errors.date_revision}
          testID="date_revision"
        />
        <ButtonGroup style={{ marginTop: "auto" }}>
          <Button
            variant="primary"
            onPress={submitFormData}
            disabled={Object.keys(modified).length === 0}
            loading={isLoading}
          >
            {COMMON_MESSAGES.SEND_BUTTON}
          </Button>
          <Button onPress={clearFormData} disabled={isLoading}>
            {COMMON_MESSAGES.RESTART_BUTTON}
          </Button>
        </ButtonGroup>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { minHeight: "100%" },
  title: {
    paddingVertical: 20,
  },
});
