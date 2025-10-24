import CreateJobMenu from "@/components/job-section/CreateJobCard";
import JobSection from "@/components/job-section/JobSection";
import Navbar from "@/components/Navbar";

const DashboardAdmin = () => {
  return (
    <section className="flex flex-col h-dvh">
      <Navbar />
      <div className="grid grid-cols-5 flex-1 gap-6 py-9 px-6">
        <JobSection />
        <CreateJobMenu />
      </div>
    </section>
  );
};

export default DashboardAdmin;
