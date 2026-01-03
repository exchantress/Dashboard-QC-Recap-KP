import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "An area chart with axes"
const chartData = [
    { month: "January", approve: 186, reject: 80 },
    { month: "February", approve: 305, reject: 200 },
    { month: "March", approve: 237, reject: 120 },
    { month: "April", approve: 73, reject: 190 },
    { month: "May", approve: 209, reject: 130 },
    { month: "June", approve: 214, reject: 140 },
]
const chartConfig = {
    approve: {
        label: "approve",
        color: "var(--chart-2)",
    },
    reject: {
        label: "reject",
        color: "var(--chart-1)",
    },
}

export default function Linechart() {
    return (
        <div className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Statistik QC</CardTitle>
                    <CardDescription>
                        Showing QC Trend for 6 months
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: -20,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickCount={3}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Area
                                dataKey="approve"
                                type="natural"
                                fill="var(--color-approve)"
                                fillOpacity={0.4}
                                stroke="var(--color-approve)"
                                stackId="a"
                            />
                            <Area
                                dataKey="reject"
                                type="natural"
                                fill="var(--color-reject)"
                                fillOpacity={0.4}
                                stroke="var(--color-reject)"
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2 leading-none font-medium">
                                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="text-muted-foreground flex items-center gap-2 leading-none">
                                January - June 2024
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}