import React from "react";
type Props = {
  title: string;
  handleView: () => void;
  handleDownload: () => Promise<void>;
};
const ViewDownload: React.FC<Props> = ({
  title,
  handleDownload,
  handleView,
}) => {
  return (
    <div className="flex items-center justify-between mt-5 font-poppins flex-wrap">
      <h3 className="text-sm lg:text-base  capitalize font-semibold text-[#323C47] mb-5">
        {title}
      </h3>
      <div className="mb-5">
        <button
          className="bg-secondary text-sm lg:text-base text-white rounded-lg py-1 px-5 hover:opacity-90 capitalize"
          onClick={handleView}
        >
          view
        </button>
        <button
          className="bg-secondary text-sm lg:text-base text-white rounded-lg py-1 px-5 hover:opacity-90 ml-5 capitalize"
          onClick={handleDownload}
        >
          download
        </button>
      </div>
    </div>
  );
};

export default ViewDownload;
