import { useEffect, useMemo, useState } from "react";
import { Product } from "../../interfaces/Product";
import product_service from "../../services/product/product-service";
import useDebounce from "../useDebounce/useDebounce";

export default function useProducts() {
  const [productList, setProductList] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>();
  const debounce = useDebounce();

  function getProducts() {
    setIsLoading(true);
    product_service
      .getAll()
      .then((e) => {
        setError(null);
        setProductList(e);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getProducts();
  }, []);

  const searchProduct = (key: string) => {
    debounce(() => setSearch(key));
  };

  const filteredProducts = useMemo(() => {
    return search
      ? productList?.filter((e) =>
          e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : productList;
  }, [search, productList]);

  return {
    isLoading,
    productList: filteredProducts,
    error,
    searchProduct,
    reloadProducts: getProducts,
  };
}
