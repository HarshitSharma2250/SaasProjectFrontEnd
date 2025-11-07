"use client";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function UserRegistrationChart() {
    const options = {
        chart: {
            type: "area" as const,
            width: 360,
            background: "transparent",
            toolbar: {
                show: false,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 20,
                    left: 0,
                },
            },
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
        colors: ["#8712C2"],
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
            ],
            crosshairs: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: true,
            },
            labels: {
                style: {
                    colors: "#B0BBD5",
                    fontSize: "9px",
                    fontWeight: 700,
                },
            },
        },
        grid: {
            show: false,
            padding: {
                bottom: 15,
                left: 15,
            },
        },
        stroke: {
            width: 2,
            curve: "straight" as const,
        },
    };

    const series = [
        {
               name: " User Registrations",
             data: [10, 20, 15, 40, 50, 55, 70, 20, 90, 100, 110, 112]
            },
    ];

    return (
        <  >
            <Chart
                options={options}
                series={series}
                type="area"
                height={360}
                width={700}
            />
        </>
    );
}
