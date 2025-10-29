import { useLocation } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  // Konfigurasi tampilan navbar berdasarkan path
  const isAdmin = path.startsWith("/admin");

  return (
    <nav
      className={`w-full border-b ${isAdmin ? "bg-white" : "bg-neutral-10"}`}>
      <div
        className={`flex shrink-0 items-center justify-between h-16 px-5 ${
          isAdmin ? "" : "container mx-auto justify-end"
        }`}>
        {/* Logo hanya muncul di halaman admin */}
        {isAdmin && <p className="text-xl-bold">Joblist</p>}

        {/* Avatar selalu muncul */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      {/* Garis pemisah hanya di non-admin */}
      {!isAdmin && <Separator className="bg-neutral-30" />}
    </nav>
  );
};

export default Navbar;
