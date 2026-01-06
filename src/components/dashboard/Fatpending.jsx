import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RiErrorWarningLine } from "react-icons/ri";

export default function Fatpending({ pendingpm }) {
    return (
        <Card className="flex flex-col w-full border-2 border-red-600 gap-0 bg-transparent shadow-md">
            <CardHeader>
                <div className="flex flex-row justify-between">
                    <CardTitle className='text-xl pr-3'>Jumlah FAT yang belum ada Work Order untuk Maintenance</CardTitle>
                    <div className="w-12 h-12 bg-red-200 rounded-sm">
                        <RiErrorWarningLine className="w-12 h-12"></RiErrorWarningLine>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="mt-auto">
                <h1 className="text-6xl font-bold pt-10 pb-2 text-red-600">{pendingpm}</h1>
            </CardContent>
            <CardContent className='text-neutral-600/75 dark:text-neutral-400/75'>
                <h1 className="text-lg">Pending PM Assignment</h1>
            </CardContent>
        </Card>
    )
}