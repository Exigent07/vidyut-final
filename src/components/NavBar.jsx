import MenuButton from "./MenuButton";
import Image from "next/image";
import logo from "../../public/images/logo.svg";

export default function NavBar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-transparent px-3 sm:px-12 py-3">
      <div className="relative flex items-center justify-between max-w-[1440px] mx-auto h-[80px] sm:h-[100px]">
        <MenuButton />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={logo}
            alt="Logo"
            className="h-[60px] sm:h-[75px] object-contain cursor-pointer"
          />
        </div>

        <div
          className="relative text-foreground text-base sm:text-lg font-medium cursor-pointer"
        >
          <a href="/register" className="relative z-10">
            Register
          </a>
          <span
            className="absolute left-0 bottom-0 h-[2px] bg-foreground w-full opacity-0 scale-x-0"
          />
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto mt-4">
        <div className="h-px bg-accent opacity-20 w-full" />
      </div>
    </nav>
  );
};
