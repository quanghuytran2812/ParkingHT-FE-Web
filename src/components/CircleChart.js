import "assets/css/pieChart.css"
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';
import {CicleChartData} from "ultils/contants"

const CircleChart = () => {


    return (
        <div className='PieChart'>
            <h2 className="PieChartTitle">The top five managers</h2>
            <ResponsiveContainer aspect={2.5 / 1.8}>
                <PieChart>
                    <Pie data={CicleChartData} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#02aab0" label />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CircleChart
