"use client";
import { useUIStore } from "@/stores/useUIStore";
import MyIcon from "../icon/MyIcon";

const ButtonBurger = () => {
  const { toggleSidebar, isSideBarShow } = useUIStore();

  return (
    <div
      onClick={() => toggleSidebar()}
      className="cursor-pointer hover:text-slate-400 text-center"
    >
      {isSideBarShow === "show" ? (
        <MyIcon
          src="/assets/icons/ic-sidebar.svg"
          width={24}
          height={24}
          className="text-[#267D39] mx-1"
        />
      ) : (
        <MyIcon
          src="/assets/icons/ic-sidebar_expand.svg"
          width={24}
          height={24}
          className="text-[#267D39] mx-1"
        />
      )}
    </div>
  );
};

export default ButtonBurger;
