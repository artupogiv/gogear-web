import { Link } from "react-router";
import type { Route } from "./+types/product-slug";
import type { Product } from "~/modules/product/type";
import { convertCurrencyToIDR } from "~/lib/currency";
import { parseHtmlToReact } from "~/lib/html";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data.name} | GoGear` },
    {
      name: "description",
      content: `${data.description}`,
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/products/${params.slug}`
  );
  const product: Product = await response.json();
  return product;
}

export default function ProductSlug({ loaderData }: Route.ComponentProps) {
  const product = loaderData;

  return (
    <div className="container mx-auto">
      <div
        key={product.id}
        className="flex p-4 border border-gray-600 rounded-lg"
      >
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold py-4">{product.name}</h2>
          <p className="prose text-gray-700 py-4">
            {parseHtmlToReact(
              product.description?.substring(0, 70).concat("...")
            )}
          </p>
          <h3 className="text-lg text-gray-900 font-bold">
            {convertCurrencyToIDR(product.price)}
          </h3>
        </div>
      </div>
    </div>
  );
}
