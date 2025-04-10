import type { Products } from "~/modules/product/type";
import type { Route } from "./+types/home";

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
      <h1>⚙️GoGear</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border border-gray-200 rounded-lg"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto"
            />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <h3 className="text-gray-700 font-bold">Price: Rp {product.price}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
