import { BusinessError, BusinessErrorCodes } from "../../classes/error";
import { Product, UpdateProductInput } from "../../interfaces/Product";
import api_service from "../_api/api-service";

const ENDPOINT = "/bp/products";

export class ProductService {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(): Promise<Product[]> {
    return api_service.get(this.endpoint).then((e) => e.data);
  }

  async update(product: UpdateProductInput) {
    return api_service
      .put(`${this.endpoint}/${product.id}`, product)
      .then((e) => e.data);
  }

  async create(product: UpdateProductInput) {
    return api_service.post(`${this.endpoint}`, product).then((e) => e.data);
  }

  async delete(id: string): Promise<boolean> {
    return api_service.delete(`${this.endpoint}/${id}`).then(() => true);
  }

  async verifyIfExists(id: string): Promise<boolean> {
    return api_service.get(`${this.endpoint}/verification/${id}`).then((e) => {
      if (e) {
        throw new BusinessError(BusinessErrorCodes.PRODUCT_ALREADY_EXIST);
      }
      return e;
    });
  }
}

const product_service = new ProductService(ENDPOINT);
export default product_service;
