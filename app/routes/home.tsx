import { Link } from "react-router";
import type { Route } from "./+types/home";
import type { Products } from "~/modules/product/type";
import { convertCurrencyToIDR } from "~/lib/currency";
import { parseHtmlToReact } from "~/lib/html";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GoGear" },
    {
      name: "description",
      content:
        "E-commerce personal project dedicated to support your tech experience",
    },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/collections/products`
  );
  const products: Products = await response.json();
  return products;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <div className="container mx-auto">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link to={`/products/${product.slug}`}>
                <div
                  key={product.id}
                  className=" dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-600 px-2 py-4 h-full"
                >
                  <div className="aspect-square ">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover "
                    />
                  </div>
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
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
