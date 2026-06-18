import { NavLink } from "react-router";
import type { SidebarItem } from "../Layout/MaiLayout";
import type { Dispatch, SetStateAction } from "react";

interface Props {
    title: string;
    sideItemsArray: SidebarItem[];
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}



export default function SideNavigation({ title, sideItemsArray, setIsSidebarOpen }: Props) {
    return (
        <div>
            <h1 className=" text-[18px] sm:text-xll mb-4 text-[#1E293B] font-semibold">{title}</h1>



            <nav className=" space-y-2">
                {sideItemsArray.map((item) => (
                    <NavLink
                        to={item.path}
                        end
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-4 py-2 text-sm sm:text-[18px] font-medium transition-all
                ${isActive
                                ? "bg-[#1F3A5F] text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>



        </div>
    );
}