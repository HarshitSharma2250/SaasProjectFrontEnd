"use client";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });





export default function ExchangeRateChart() {
    const rate_trends = [
        {
            date: "2025-10-01",
            price_inr: 51200,
            price_usd: 610,
            trend: "up",
        },
        {
            date: "2025-10-02",
            price_inr: 50800,
            price_usd: 605,
            trend: "down",
        },
        {
            date: "2025-10-03",
            price_inr: 51550,
            price_usd: 617,
            trend: "up",
        },
        {
            date: "2025-10-04",
            price_inr: 52020,
            price_usd: 623,
            trend: "up",
        },
        {
            date: "2025-10-05",
            price_inr: 51800,
            price_usd: 620,
            trend: "down",
        },
    ]

    const series = [
        {
            name: "Total Revenue INR",
            data: rate_trends.map((ele) => ele.price_inr),
        }, {
            name: "Total Revenue USD",
            data: rate_trends.map((ele) => ele.price_usd),
        },
        {
            name: "Trend (Up/Down)",
            data: rate_trends.map((ele) => (ele.trend === "up" ? 1 : -1)),
        },
    ];

    const options = {
        chart: {
            width: 360,
            type: "area" as const,
            toolbar: {
                show: false,
            },
        },
        strokeWidth: 2,
        colors: ["#8712C2", "#12C29A", "#"],
        dataLabels: {
            enabled: false,
        },
        grid: {
            show: false,
        },
        fill: {
            type: "gradient" as const,
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.1,
                opacityTo: 0.6,
                stops: [0, 90, 100],
            },
        },
        markers: {
            size: 0,
            colors: ["#8712C2", "#12C29A"], // purple and green
            strokeColors: ["#8E44AD"],
            strokeWidth: 2,
            hover: {
                size: 8,
            },
        },
        tooltip: {
            custom: function ({
                series,
                seriesIndex,
                dataPointIndex,
            }: {
                series: number[][];
                seriesIndex: number;
                dataPointIndex: number;
            }) {
                const value = series[seriesIndex][dataPointIndex];
                return `<div style="font-size: 12px; color: #8E44AD;">${value}</div>`;
            },
        },
        xaxis: {
            categories: rate_trends.map((ele) => ele.date) || [],
            tooltip: {
                enabled: false,
            },
            crosshairs: {
                show: false,
            },
        },
        yaxis: [
            {
                title: { text: "Revenue (INR)" },
                labels: { formatter: (val: number) => val.toLocaleString() },
            },
            {
                opposite: true,
                title: { text: "Revenue (USD)" },
                labels: { formatter: (val: number) => `$${val}` },
            },
            {
                opposite: true,
                title: { text: "Trend (Up/Down)" },
                min: -2,
                max: 2,
                labels: {
                    formatter: (value: number) =>
                        value === 1 ? "Up" : value === -1 ? "Down" : "",
                },
            },
        ],
        stroke: {
            width: 2,
            curve: "smooth" as const,
        },
    };


    return (
            <Chart
                options={options}
                series={series}
                type="area"
                height={335}
               width="100%"
                data-testid="ExchangeRateChart"
            />
    )
}