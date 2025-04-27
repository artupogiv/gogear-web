import { redirect } from "react-router";
import { destroySession, getSession } from "~/session-server";
import type { Route } from "./+types/cart";
import type { Cart } from "~/modules/cart/schema";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("token")) {
    return redirect("/login");
  }

  const token = session.get("token");
  console.info("dashboard:token", token);

  const response = await fetch(`${process.env.BACKEND_API_URL}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    session.flash("error", "Failed to check user");
    return redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  const cart: Cart = await response.json();
  console.info({ cart });

  return cart;
}

export default function CartPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
      <div className="flex flex-col gap-4">
        {loaderData.items.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{item.product.name}</CardTitle>
                <span className="text-lg font-black text-gray-900">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(item.product.price)}
                </span>
              </div>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="text-gray-600 text-lg">Quantity: {item.quantity}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex flex-col justify-end mt-4 ">
        <div className="flex justify-end text-xl">
          <span className="font-black text-gray-900">Subtotal: {}</span>
        </div>
        <Button>Checkout</Button>
      </div>
    </div>
  );
}
