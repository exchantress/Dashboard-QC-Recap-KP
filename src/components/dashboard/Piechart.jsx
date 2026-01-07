import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import Linechart from './Linechart.jsx';
import { useQuery } from "@tanstack/react-query";
import { fetchMonthly } from "@/utils/Services/Yohan/getDashboard";
import { Spinner } from "../ui/spinner.jsx";

const chartConfig = {
    qc: {
        label: "Status",
    },
    DONE: {
        label: "DONE",
        color: "var(--chart-2)",
    },
    REJECT: {
        label: "REJECT",
        color: "var(--chart-1)",
    },
    NOTYET: {
        label: "NOT YET",
        color: "var(--chart-3)",
    },
}

export default function Piechart({ data, isLoading }) {
    const monthlyQuery = useQuery({
        queryKey: ["monthly"],
        queryFn: fetchMonthly
    });

    const chartData = [
        { status: "DONE", value: data?.approve || 0, fill: "var(--color-DONE)" },
        { status: "REJECT", value: data?.reject || 0, fill: "var(--color-REJECT)" },
        { status: "NOTYET", value: data?.notyet || 0, fill: "var(--color-NOTYET)" },
    ];

    if (isLoading) {
        return <div className="row-span-2 max-w-md">
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Statistik Status WO</CardTitle>
                    <CardDescription>January - Desember 2025</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <Spinner></Spinner>
                </CardContent>
            </Card>
            <div className="">
                <Linechart data={monthlyQuery.data} isLoading={monthlyQuery.isLoading} />
            </div>
        </div>
    }
    return (
        <div className="row-span-2 max-w-md">
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Statistik Status WO</CardTitle>
                    <CardDescription>January - Desember 2025</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-96">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="status"
                                innerRadius={60}
                            />
                            <ChartLegend
                                content={<ChartLegendContent nameKey="status" />}
                                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <div className="">
                <Linechart data={monthlyQuery.data} isLoading={monthlyQuery.isLoading} />
            </div>
        </div>
    )
}