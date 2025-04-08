"use client";
import MyIcon from "@/components/common/icon/MyIcon";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

const UserDropdown = () => {
  const router = useRouter();

  const [show, setIsShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    Cookies.remove("token");
    router.refresh(); // ✅ Refresh the page to trigger middleware
  };

  const { setUserFromToken, user } = useAuthStore();
  // const setUserFromToken = useAuthStore((state) => state.setUserFromToken);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setUserFromToken(token);
    }
  }, [setUserFromToken]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center justify-between max-w-[300px] gap-6 cursor-pointer"
        onClick={() => setIsShow((prev) => !prev)}
      >
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="/assets/images/user.jpg" // Ganti dengan URL atau path gambar
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </div>

          {/* Informasi Pengguna */}
          <div className=" hidden sm:block">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>
        <div className=" hidden sm:block">
          <MyIcon
            src="/assets/icons/ic-chevron_down.svg"
            width={20}
            height={20}
            className="text-[#9CA3AF]"
          />
        </div>
      </div>
      <div
        className={`sm:w-full w-[250px]  ${
          show
            ? "opacity-100 z-40 translate-y-0"
            : "-z-50 opacity-0 delay-150 -translate-y-10"
        } transition-all duration-150 bg-white border shadow-md absolute top-full right-0 rounded-lg mt-2 text-[#414651] flex flex-col gap-1`}
      >
        <div className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#267D39] hover:text-[#FFFFFF] rounded-lg cursor-pointer group">
          <MyIcon
            src="/assets/icons/ic-user.svg"
            width={16}
            height={16}
            className="group-hover:text-[#5DCB74]"
          />
          <p className="text-sm font-medium">View profile</p>
        </div>
        <div className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#267D39] hover:text-[#FFFFFF] rounded-lg cursor-pointer group">
          <MyIcon
            src="/assets/icons/ic-settings.svg"
            width={16}
            height={16}
            className="group-hover:text-[#5DCB74]"
          />
          <p className="text-sm font-medium">Settings</p>
        </div>
        <div className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#267D39] hover:text-[#FFFFFF] rounded-lg cursor-pointer group">
          <MyIcon
            src="/assets/icons/ic-help-circle.svg"
            width={16}
            height={16}
            className="group-hover:text-[#5DCB74]"
          />
          <p className="text-sm font-medium">Support</p>
        </div>
        <div
          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#267D39] hover:text-[#FFFFFF] rounded-lg cursor-pointer group"
          onClick={() => handleLogout()}
        >
          <MyIcon
            src="/assets/icons/ic-log-out.svg"
            width={16}
            height={16}
            className="group-hover:text-[#5DCB74]"
          />
          <p className="text-sm font-medium">Log out</p>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
