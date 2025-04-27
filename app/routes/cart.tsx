import type { Route } from "./+types/cart";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("token")) {
    return redirect("/login");
  }

  const token = session.get("token");
  console.info("dashboard:token", token);

  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/me`, {
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

  const userData: User = await response.json();
  console.info({ userData });

  return userData;
}
