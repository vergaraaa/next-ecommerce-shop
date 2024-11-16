export const revalidate = 0;

import Link from "next/link";

import { Title } from "@/components/ui/title/Title";
import { currencyFormat } from "@/utils/currencyFormat";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = pageParam ? parseInt(pageParam) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });

  return (
    <>
      <Title title="Products" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          New Product
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Image
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Title
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Gender
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                In stock
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Sizes
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.ProductImage[0]?.url}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                </td>

                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>

                <td className=" text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>

                <td className=" text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {product.gender}
                </td>

                <td className=" text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {product.inStock}
                </td>

                <td className=" text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {product.sizes.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination totalPages={totalPages} />
    </>
  );
}
