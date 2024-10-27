"use client";

import { useEffect, useState } from "react";

import { titleFont } from "@/config/fonts";
import { getStockBySlug } from "@/actions/products/get-stock-by-slug";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [inStock, setInStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      const inStock = await getStockBySlug(slug);

      setInStock(inStock);
      setIsLoading(false);
    };

    getStock();
  }, [slug]);

  return (
    <>
      {isLoading ? (
        <h1
          className={`${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {inStock}
        </h1>
      )}
    </>
  );
};
