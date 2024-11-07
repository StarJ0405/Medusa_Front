import style from "./RadarChart.module.css";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

import { Radar } from 'react-chartjs-2';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    // Legend
);

function RadarChart(props) {
    const {t} = useTranslation();
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        let labels = [];
        let values = [];
        props.data.map((data) => {
            labels.push(t(data.code));
            values.push(data.valueNumber);
        });

        setLabels(labels);
        setValues(values);
    }, [props.data]);

    const data = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        elements: {
            point: {
                radius: 3
            },
        },
        scale: {
            ticks: {
                display: false,
                min: 0,
                max: 5,
                beginAtZero: true,
                stepSize: 1
            }
        },
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0,
                suggestedMax: 5,
                pointLabels: {
                    font: {
                        size: 12
                    }
                },
                ticks: {
                    display: false,
                    color: 'transparent'
                }
            }
        },
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: 'rgb(255, 99, 132)'
                }
            }
        }
    };

    return (
        <Radar width={100} height={100} data={data} options={options} />
    );
}

export default RadarChart;