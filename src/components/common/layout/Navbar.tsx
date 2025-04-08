import React from "react";
import MyIcon from "../icon/MyIcon";
import NotificationDropdown from "@/components/features/notification/NotificationDropdown";
import UserDropdown from "@/components/features/user/UserDropdown";

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b-[1px] border-[#F5F5F5] h-16 flex items-center px-8">
      <div className="flex w-full justify-between items-center">
        <div>
          <MyIcon
            src="/assets/icons/logo-sonergy2.svg"
            width={127}
            height={50}
          />
        </div>
        <div className="flex items-center gap-4">
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
