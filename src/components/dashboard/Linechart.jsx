import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Spinner } from "@/components/ui/spinner";

export default function Linechart({ data = [], isLoading }) {
    if (isLoading) {
        return <div className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Statistik QC</CardTitle>
                    <CardDescription>
                        Showing QC Trend for 6 months
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Spinner />
                </CardContent>
            </Card>
        </div>
    }

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
                    <ChartContainer config={[]}>
                        <AreaChart accessibilityLayer data={data} margin={{ left: -20, right: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)} />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickCount={3} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Area
                                dataKey="approve"
                                type="natural"
                                fill="#16a34a"
                                fillOpacity={0.4}
                                stroke="#15803d"
                                stackId="a" />
                            <Area
                                dataKey="reject"
                                type="natural"
                                fill="#ef4444"
                                fillOpacity={0.4}
                                stroke="#dc2626"
                                stackId="a" />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2 leading-none font-medium">
                                June - Desember 2025 <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="text-muted-foreground flex items-center gap-2 leading-none">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, nostrum.
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}