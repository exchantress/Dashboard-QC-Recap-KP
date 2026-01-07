import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "../ui/spinner";

export default function Progresqc({ data, isLoading }) {

    const persentase = data?.notyet ? (data.approve / (data.approve + data.notyet)) * 100 : 0;

    if (isLoading) {
        return <Card className="flex-col flex w-full gap-0 bg-transparent shadow-md justify-self-center">
            <CardHeader>
                <CardTitle className="text-xl">WO QC Progress</CardTitle>
            </CardHeader>
            <CardContent className="mt-auto">
                <div className="flex flex-row pt-8">
                    <div className="flex-col">
                        <div className="w-12 h-12 bg-green-100 rounded-sm items-center flex justify-center">
                            <FaRegCheckCircle className="w-8 h-8 text-green-400"></FaRegCheckCircle>
                        </div>
                        <Spinner></Spinner>
                        <h1 className="text-neutral-600/75 dark:text-neutral-400/75">QC Done</h1>
                    </div>
                    <div className="ml-15 h-30 border" />
                    <div className="flex-col pl-15">
                        <div className="w-12 h-12 bg-yellow-100 rounded-sm items-center flex justify-center">
                            <IoMdTime className="w-9 h-9 text-yellow-400"></IoMdTime>
                        </div>
                        <Spinner></Spinner>
                        <h1 className="text-neutral-600/75 dark:text-neutral-400/75">Pending QC</h1>
                    </div>
                </div>
            </CardContent>
            <CardContent className="mt-auto">
                <div className="flex flex-row gap-4 items-center">
                    <Progress value={persentase} />
                    <Spinner></Spinner>
                </div>
            </CardContent>
        </Card>
    }

    return (
        <Card className="flex-col flex w-full gap-0 bg-transparent shadow-md justify-self-center">
            <CardHeader>
                <CardTitle className="text-xl">WO QC Progress</CardTitle>
            </CardHeader>
            <CardContent className="mt-auto">
                <div className="flex flex-row pt-8">
                    <div className="flex-col">
                        <div className="w-12 h-12 bg-green-100 rounded-sm items-center flex justify-center">
                            <FaRegCheckCircle className="w-8 h-8 text-green-400"></FaRegCheckCircle>
                        </div>
                        <h1 className="text-4xl pt-2 font-bold text-green-400">{data?.approve || 0}</h1>
                        <h1 className="text-neutral-600/75 dark:text-neutral-400/75">QC Done</h1>
                    </div>
                    <div className="ml-15 h-30 border" />
                    <div className="flex-col pl-15">
                        <div className="w-12 h-12 bg-yellow-100 rounded-sm items-center flex justify-center">
                            <IoMdTime className="w-9 h-9 text-yellow-400"></IoMdTime>
                        </div>
                        <h1 className="text-4xl pt-2 font-bold text-yellow-400">{data?.notyet || 0}</h1>
                        <h1 className="text-neutral-600/75 dark:text-neutral-400/75">Pending QC</h1>
                    </div>
                </div>
            </CardContent>
            <CardContent className="mt-auto">
                <div className="flex flex-row gap-4 items-center">
                    <Progress value={persentase} />
                    <h1 className="text-neutral-600/75 dark:text-neutral-400/75"> {persentase.toFixed(2)}% QC Completed</h1>
                </div>
            </CardContent>
        </Card>
    )
}