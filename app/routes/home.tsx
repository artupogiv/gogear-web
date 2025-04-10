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

export default function Home() {
  return (
    <div>
      <h1>⚙️GoGear</h1>
    </div>
  );
}
