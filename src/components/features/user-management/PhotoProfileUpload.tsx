import React from "react";

const PhotoProfileUpload = () => {
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label className="font-medium text-sm text-[#374151]">
        Photo Profile
      </label>
      <div>
        <div>
          <div className="w-[150px] h-[150px] rounded-full bg-neutral-900"></div>
        </div>
      </div>
    </div>
  );
};

export default PhotoProfileUpload;
