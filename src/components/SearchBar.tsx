import { Search } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

const SearchBar = () => {
  return (
    <InputGroup className="col-span-4">
      <InputGroupInput placeholder="Search by job details" />
      <InputGroupAddon align="inline-end">
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchBar;
