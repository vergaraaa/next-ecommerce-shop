import Link from "next/link";
import Image from "next/image";
import { Product } from "@/interfaces/product.interface";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`} className="group">
        <Image
          src={`/products/${product.images[0]}`}
          alt={product.title}
          className="w-full object-cover rounded group-hover:hidden"
          width={500}
          height={500}
        />
        <Image
          src={`/products/${product.images[1]}`}
          alt={product.title}
          className="hidden w-full object-cover rounded group-hover:block"
          width={500}
          height={500}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link href={`/product/${product.slug}`} className="hover:text-blue-600">
          {product.title}
        </Link>

        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
