import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import Linechart from './Linechart.jsx';

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

export default function Piechart({ done, pending, reject }) {
    const chartData = [
        { status: "DONE", value: done, fill: "var(--color-DONE)" },
        { status: "REJECT", value: reject, fill: "var(--color-REJECT)" },
        { status: "NOTYET", value: pending, fill: "var(--color-NOTYET)" },
    ];
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
                <Linechart />
            </div>
        </div>
    )
}