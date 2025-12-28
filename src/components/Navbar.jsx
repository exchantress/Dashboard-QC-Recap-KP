import { RiDashboardHorizontalLine } from "react-icons/ri";

export default function Navbar() {
    return (
        <div className="bg-neutral-100 p-4 shadow-md shadow-black-10/5">
            <div className="flex px-5 gap-3 items-center">
                <RiDashboardHorizontalLine className="flex text-black w-8 h-8"></RiDashboardHorizontalLine>
                <h2 className="text-xl text-black font-semibold">
                    Dashboard GeLoo
                </h2>
            </div>
        </div>
    )
}