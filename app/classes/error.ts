export enum NetworkErrorCodes {
  "NOT_FOUND" = "No se ha encontrado el recurso",
  "UNAUTORIZED" = "Acceso no autorizado",
  "BAD_REQUEST" = "Tu solicitud no ha podido ser procesada, vuelve a intentarlo",
  "TIMEOUT" = "No se ha podido establecer comunicación con el servidor",
  "SERVER_ERROR" = "Se ha producido un error en tu solicitud",
  "UNKNOWN" = "Se ha producidor un error",
}

export enum BusinessErrorCodes {
  "PRODUCT_NOT_FOUND" = "No se ha encontrado el producto",
  "PRODUCT_ALREADY_EXIST" = "Ya existe un producto con este identificador",
}

export class CustomError extends Error {}

export class NetworkError extends CustomError {
  constructor(message: NetworkErrorCodes) {
    super(message);
    this.name = "NetworkError";
  }
}

export class BusinessError extends CustomError {
  constructor(message: BusinessErrorCodes) {
    super(message);
    this.name = "BusinessError";
    this.stack = "";
  }
}
