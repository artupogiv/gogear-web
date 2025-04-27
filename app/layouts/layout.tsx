import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col ">
      <header className="text-gray-700 ">
        <div className="container mx-auto px-4 py-4 ">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 ">
            <Link to="/" className="flex items-center gap-2 ">
              <img
                src="/gogear-high-resolution-logo-transparent.png"
                alt="logo"
                className=""
                width={75}
                height={75}
              />
            </Link>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-400"
                />
              </div>
            </div>
            <nav>
              <ul className="flex items-center gap-6">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-shadow-gray-800 hover:underline transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-gray-600 hover:text-shadow-gray-800 hover:underline transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-shadow-gray-800 hover:underline transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-gray-600 hover:text-shadow-gray-800 hover:underline transition-colors"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-shadow-gray-800 hover:underline transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="text-gray-600 hover:text-shadow-gray-800 hover:underline transition-colors"
                  >
                    Cart
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="text-gray-600 py-8 ">
        <div className="container mx-auto px-4 ">
          <div className="flex flex-col md:flex-row justify-end items-center gap-4">
            <p className="text-sm">
              &copy; {new Date().getFullYear()}, Go Gear by{" "}
              <a
                href="https:github.com/artupogiv"
                className="font-bold text-blue-700"
              >
                artupogiv
              </a>{" "}
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
