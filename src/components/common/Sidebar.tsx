"use client";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarPlus, faChartBar, faCreditCard, faHouse, faSubway, faUser } from "@fortawesome/free-solid-svg-icons";
import { useUIStore } from "@/stores/useUIStore";
import { usePathname } from "next/navigation";

const menu = [
  {
    id: 1,
    label: 'dashboard',
    url: '/dashboard',
    sub: [],
    icon: faHouse
  },
  {
    id: 2,
    label: 'profile',
    url: '/profile',
    sub: [],
    icon: faUser
  },
  {
    id: 3,
    label: 'calendar',
    url: '/calendar',
    sub: [],
    icon: faCalendar
  },
  {
    id: 4,
    label: 'user',
    url: '/user',
    sub: [],
    icon: faUser
  },
  {
    id: 5,
    label: 'Test Sub',
    url: '',
    icon: faSubway,
    sub: [
      {
        id: 1,
        label: 'sub 1',
        url: '/test-sub/sub 1',
        icon: faSubway
      }
    ]
  }
]

const Sidebar = () => {

  const pathname = usePathname(); // Extracts "/pokemon/beedrill"
  const { isSideBarShow, toggleSidebar } = useUIStore();

  useEffect(() => {
    console.log(pathname)
  }, [pathname])


  return (
    <aside
      className={`bg-slate-500 min-h-screen text-white transition-all  duration-300 ${isSideBarShow === 'show' ? "w-64" : isSideBarShow === 'minify' ? 'w-16' : 'w-0'}`}
    >
      <div className="w-full h-16 flex items-center px-3 ">
        <div
          onClick={() => toggleSidebar()}
          className="flex items-center gap-1 cursor-pointer"
        >
          <div className="w-[40px] h-[40px]">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          </div>
          <h1
            className={`font-bold delay-150 text-md ${isSideBarShow === 'show' ? "" : "hidden"}`}
          >
            Logo
          </h1>
        </div>
      </div>


      <div className="flex justify-start w-full">
        <ul className="w-full">
          {
            menu?.map((item, idx) => (
              <Fragment key={idx}>
                <li className={`py-2 flex w-full ${pathname === item.url && 'bg-orange-900 border-l-4'}`} >
                  <Link
                    href={item.url}
                    className="flex items-center gap-3 text-sm px-4 hover:text-blue-400"
                  >
                    <FontAwesomeIcon icon={item.icon} className="text-[20px] w-8" />
                    {isSideBarShow === 'show' && item.label}
                  </Link>

                </li>
                {
                  item?.sub?.map((sub, idx) => (
                    <li className={`py-2 flex w-full ${pathname === sub.url && 'bg-orange-900 border-l-4'}`} key={idx}>
                      <Link
                        href={item.url}
                        className="flex items-center gap-3 text-sm pl-20 hover:text-blue-400"
                      >
                        {/* <FontAwesomeIcon icon={sub.icon} className="text-[20px] w-8" /> */}
                        {isSideBarShow === 'show' && sub.label}
                      </Link>
                    </li>
                  ))
                }

              </Fragment>
            ))
          }
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
