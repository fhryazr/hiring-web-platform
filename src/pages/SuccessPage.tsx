import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const SuccessPage = () => {
  return (
    <div className="h-dvh flex flex-col justify-center items-center">
      <img src="/Container.svg" alt="apply-success-img" />
      <h3 className="text-xl font-bold mt-4 mb-2">
        Your Application was sent!
      </h3>
      <p className="text-neutral-90">
        Congratulations! You've taken the first step towards a rewarding career
        at Rakamin.
      </p>
      <p className="text-neutral-90">
        We look forward to learning more about you during the application
        process.
      </p>
      <Link to={"/career"}>
        <Button className="px-6 py-2 mt-6 bg-primary-surface text-black border-2 border-primary-border hover:bg-neutral-30">
          Back to Career
        </Button>
      </Link>
    </div>
  );
};

export default SuccessPage;
