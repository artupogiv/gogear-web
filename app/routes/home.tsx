import type { Products } from "~/modules/product/type";
import type { Route } from "./+types/home";
import { convertCurrencyToIDR } from "~/lib/currency";
import { Link } from "react-router";

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
  const response = await fetch(`${process.env.BACKEND_API_URL}/products`);
  const products: Products = await response.json();
  return products;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <div className="container mx-auto">
      <div>
        <Link to={`/`}>
          <h1 className="text-4xl font-bold py-8">⚙️GoGear</h1>
        </Link>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link to={`/products/${product.slug}`}>
                <div
                  key={product.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="size-100 object-cover"
                  />
                  <h2 className="text-xl font-bold py-4">{product.name}</h2>
                  <p className="text-gray-700 py-4">{product.description}</p>
                  <h3 className="text-gray-700 font-bold">
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
