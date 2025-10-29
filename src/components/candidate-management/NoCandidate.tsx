const NoCandidate = () => {
  return (
    <div className="border-2 flex flex-col justify-center items-center rounded-xl h-full space-y-1">
      <img src="/Artwork.svg" alt="no candidate" className="mb-6"/>
      <h3 className="text-lg font-bold">No Candidates Found</h3>
      <p className="text-sm font-normal text-neutral-70">Share your job vacancies so that more candidates will apply.</p>
    </div>
  );
};

export default NoCandidate;
