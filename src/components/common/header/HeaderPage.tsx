"use client";
import { ReactNode } from "react";


const HeaderPage = ({
  title,
  button,
}: {
  title: string | ReactNode;
  button: string | ReactNode;
}) => {
  return (
    <div className="flex justify-between sm:items-center pb-4 border-b-[1px] mb-6 sm:flex-row flex-col gap-2">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      {button}
    </div>
  );
};

export default HeaderPage;
