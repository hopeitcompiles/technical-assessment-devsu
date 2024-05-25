import React from "react";
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
import { RouteProp, useRoute } from "@react-navigation/native";
import { ProductStackParamList } from "../../../navigation/product-navigator";
import product_service from "../../../services/product/product-service";
import { BusinessError, NetworkError } from "../../../classes/error";

export default function ProductCreateScreen() {
  const route = useRoute<RouteProp<ProductStackParamList, "ProductCreate">>();
  const product = route.params?.product;

  const {
    values,
    errors,
    handleChange,
    clearFormData,
    submitFormData,
    handleSetError,
  } = useFormData<Product>({
    schema: PRODUCT_YUP_SCHEMA,
    initialValues: product
      ? { ...product, date_release: dateFormat.simple(product.date_release) }
      : undefined,
    validateOnChange: true,
    onSubmit: submitForm,
  });

  async function submitForm(values: Product) {
    if (!product) {
      await product_service.verifyIfExists(values.id).catch((e) => {
        if (e instanceof BusinessError) {
          handleSetError("id", e.message);
          return;
        }
        if (e instanceof NetworkError) {
          Alert.alert(e.message);
          return;
        }
        Alert.alert("Se ha producido un error");
      });
      return;
    }
  }

  function handleChaneDate(value: string) {
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
          value={values.id}
          maxLength={10}
          error={errors.id}
        />
        <TextInput
          label="Nombre"
          maxLength={100}
          onChangeText={(e) => {
            handleChange("name", e);
          }}
          value={values.name}
          error={errors.name}
        />
        <TextInput
          label="Descripción"
          maxLength={300}
          onChangeText={(e) => {
            handleChange("description", e);
          }}
          value={values.description}
          error={errors.description}
        />
        <TextInput
          label="Logo"
          onChangeText={(e) => {
            handleChange("logo", e);
          }}
          value={values.logo}
          error={errors.logo}
        />
        <TextInput
          label="Fecha Liberación"
          keyboardType="numbers-and-punctuation"
          onChangeText={handleChaneDate}
          value={values.date_release as string}
          error={errors.date_release}
          placeholder={dateFormat.simple(new Date())}
        />
        <TextInput
          label="Fecha Revisión"
          readOnly
          value={
            values.date_revision && dateFormat.simple(values?.date_revision)
          }
        />
        <ButtonGroup style={{ marginTop: "auto" }}>
          <Button variant="primary" onPress={submitFormData}>
            Enviar
          </Button>
          <Button onPress={clearFormData}>Reiniciar</Button>
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
