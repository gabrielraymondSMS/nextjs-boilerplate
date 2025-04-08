"use client";
import Link from "next/link";
import { Fragment } from "react";
import { useUIStore } from "@/stores/useUIStore";
import { usePathname } from "next/navigation";
import MyIcon from "../icon/MyIcon";
import ButtonBurger from "../button/ButtonBurger";

interface MenuType {
  id: number;
  label: string;
  url: string;
  sub: [];
  icon: string;
}

const menu: MenuType[] = [
  {
    id: 1,
    label: "User Management",
    url: "/users",
    sub: [],
    icon: "/assets/icons/ic-users.svg",
  },
  {
    id: 2,
    label: "Leads",
    url: "/leads",
    sub: [],
    icon: "/assets/icons/ic-user.svg",
  },
  {
    id: 3,
    label: "Work Order",
    url: "/work-order",
    sub: [],
    icon: "/assets/icons/ic-map.svg",
  },
  {
    id: 4,
    label: "ACD",
    url: "/acd",
    sub: [],
    icon: "/assets/icons/ic-database.svg",
  },
  {
    id: 5,
    label: "Quotation",
    url: "/quotation",
    sub: [],
    icon: "/assets/icons/ic-file-text.svg",
  },
  {
    id: 6,
    label: "Pricing Comparison",
    url: "/pricing-comparison",
    sub: [],
    icon: "/assets/icons/ic-dollar-sign.svg",
  },
];

const Sidebar = () => {
  const pathname = usePathname(); // Extracts "/pokemon/beedrill"
  const { isSideBarShow } = useUIStore();


  return (
    <aside
      className={`bg-[#FFFFFF] text-[#414651] min-h-[calc(100vh-64px)] transition-all border-r-[1px] duration-300 ${
        isSideBarShow === "show" ? "sm:w-[312px] w-full" : "w-[80px]"
      }`}
    >
      <div className="w-full flex px-6 py-2.5 items-center mb-6 mt-8">
        <div className="flex w-full items-center gap-3 cursor-pointer">
          <ButtonBurger />
          <h1
            className={`font-bold delay-150 text-md text-[#414651] ${
              isSideBarShow === "show" ? "" : "hidden"
            }`}
          >
            Menu
          </h1>
        </div>
      </div>

      <div className="flex justify-start w-full">
        <ul className="w-full mx-4">
          {menu?.map((item, idx) => (
            <Fragment key={idx}>
              <li
                className={`flex w-full rounded-md hover:bg-[#267d397d] mb-1 ${
                  pathname.includes(item.url) && "bg-[#267D39]  text-white"
                }`}
              >
                <Link
                  href={item.url}
                  className="flex items-center gap-3 w-full text-sm px-3 py-2.5 capitalize "
                >
                  <MyIcon
                    src={item.icon}
                    width={24}
                    height={24}
                    className={`${
                      pathname.includes(item.url)
                        ? "text-[#5DCB74]"
                        : "text-[#717680]"
                    }`}
                  />
                  {isSideBarShow === "show" && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
