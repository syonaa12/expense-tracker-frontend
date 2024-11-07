import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ expenses }) => {
    const getCategoryData = () => {
        const categoryTotals = expenses.reduce((acc, expense) => {
            const category = String(expense.category).trim();
            const amount = parseFloat(expense.amount);

            if (category && !isNaN(amount)) {
                acc[category] = (acc[category] || 0) + amount;
            }
            return acc;
        }, {});

        return {
            labels: Object.keys(categoryTotals),
            data: Object.values(categoryTotals),
        };
    };

    const { labels, data } = getCategoryData();

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Expense Distribution',
                data,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    };

    return (
        <div className="pie-chart-container"> {/* Centering class */}
            <Pie data={chartData} />
        </div>
    );
};

export default PieChart;
