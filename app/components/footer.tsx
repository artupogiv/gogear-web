export function Footer() {
  return (
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
  );
}
