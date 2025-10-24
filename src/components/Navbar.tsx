import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Navbar = () => {
  return (
    <nav>
      <div className="flex px-5 justify-between items-center w-full h-16">
        <p className="text-xl-bold">Joblist</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Separator className="bg-neutral-30" />
    </nav>
  );
};

export default Navbar;
