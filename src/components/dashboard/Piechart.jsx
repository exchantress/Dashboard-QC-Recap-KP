import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Button } from '@/components/ui/button'

const chartData = [
    { status: "DONE", qc: 500, fill: "var(--color-DONE)" },
    { status: "REJECT", qc: 125, fill: "var(--color-REJECT)" },
    { status: "NOTYET", qc: 300, fill: "var(--color-NOTYET)" },
]

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

export default function Piechart() {
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
                                dataKey="qc"
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
            <div className="col-start-3 pt-10 items-center justify-center flex">
                <Button className='shadow-md w-md h-10'>Add Work Order (New WO) </Button>
            </div>
        </div>
    )
}