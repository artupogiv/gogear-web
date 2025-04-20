import type { Route } from "./+types/product-slug";
import type { Product } from "~/modules/product/type";
import { convertCurrencyToIDR } from "~/lib/currency";
import { Link } from "react-router";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data.name} | GoGear` },
    {
      name: "description",
      content:
        `${data.description}`,
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
    <div className="container my-4 mx-auto">
      <div className="flex flex-row justify-between items-center my-4 ">
        <Link to={`/`}>
          <img src="/gogear-high-resolution-logo-transparent.png" alt="logo" className="w-1/8 object-cover rounded-lg" />
        </Link>
        <div className="w-1/2">
          <input
            type="text" 
            placeholder="search ..."
            className="w-2xs p-2 border-2 border-orange-200 rounded-lg "/>
        </div>
      </div>

      <div
        key={product.id}
        className="flex p-4 border border-orange-200 rounded-lg"
      >
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="size-100 object-cover border border-orange-200 rounded-lg"
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
