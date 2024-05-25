import * as Yup from "yup";
import { ERROR_MESSAGES } from "../../../../constants/messages";

const parseDateString = (value: string, originalValue: string) => {
  const dateFormat =
    /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19|20)\d\d$/;
  if (typeof originalValue === "string" && dateFormat.test(originalValue)) {
    const [day, month, year] = originalValue.split("/").map(Number);
    return new Date(year, month - 1, day);
  }
  return new Date(value);
};

export const PRODUCT_YUP_SCHEMA = Yup.object().shape({
  id: Yup.string()
    .max(10, "Máximo 10 caracteres")
    .min(3, "ID no válido")
    .required("ID no válido"),
  name: Yup.string()
    .max(100, "Máximo 100 caracteres")
    .min(5, "Mínimo 5 caracteres")
    .required(ERROR_MESSAGES.REQUERIED_FIELD),
  description: Yup.string()
    .max(200, "Máximo 200 caracteres")
    .min(10, "Mínimo 10 caracteres")
    .required(ERROR_MESSAGES.REQUERIED_FIELD),
  logo: Yup.string().required(ERROR_MESSAGES.REQUERIED_FIELD),
  date_release: Yup.date()
    .typeError("Fecha de liberación no válida")
    .transform(parseDateString)
    .min(new Date(), "Debe ser igual o mayor a la fecha actual")
    .required(ERROR_MESSAGES.REQUERIED_FIELD),
  date_revision: Yup.date()
    .typeError("Fecha de revisión no válida")
    .test(
      "is-year-greater",
      "La fecha de fin revision debe ser un año mayor de la fecha de liberación",
      function (value) {
        const { date_release } = this.parent;
        if (!date_release || !value) return false;

        const startDateYear = new Date(date_release).getFullYear();
        const endDateYear = new Date(value).getFullYear();

        return endDateYear >= startDateYear + 1;
      }
    ),
});
