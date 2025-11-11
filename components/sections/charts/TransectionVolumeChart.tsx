"use client";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TransactionVolumeChart() {

 

    const options = {
        chart: {
            type: "bar" as const,
            toolbar: { show: false },
            background: "transparent",
        },

        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: "40%", // a bit wider for smooth shape
                endingShape: "rounded", // smooth top
            },
        },

        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.4,
                gradientToColors: ["#ffffff"], // fade into white
                inverseColors: false,
                opacityFrom: 0.9,
                opacityTo: 0.3, // not too transparent
                stops: [0, 100],
            },
        },

        colors: ["#8712C2"],

        dataLabels: {
            enabled: false,
        },

        xaxis: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    colors: "#B0BBD5",
                    fontSize: "12px",
                    fontWeight: 600,
                },
            },
        },

        yaxis: { show: false },
        grid: { show: false },
    };

    const series = [
        {
            name: "Total Transactions",
            data: [20000, 40000, 15000, 40000],
        },
    ];

    return (
  <Chart options={options} series={series} type="bar" height={335} width="100%" />
    );
}
