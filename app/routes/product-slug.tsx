import type { Route } from "./+types/product-slug";
import type { Product } from "~/modules/product/type";
import { convertCurrencyToIDR } from "~/lib/currency";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product - GoGear" },
    {
      name: "description",
      content:
        "E-commerce personal project dedicated to support your tech experience",
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
      <div>
        <Link to={`/`}>
          <h1 className="text-4xl font-bold py-8">⚙️GoGear</h1>
        </Link>
      </div>

      <div
        key={product.id}
        className="flex p-4 border border-gray-200 rounded-lg"
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
          <p className="text-gray-700 py-4">{product.description}</p>
          <h3 className="text-gray-700 font-bold">
            {convertCurrencyToIDR(product.price)}
          </h3>
        </div>
      </div>
    </div>
  );
}
