import { LineChartData } from "../ultils/contants"
import "../assets/css/linechart.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartStatistical = () => {

    return (
        <div className="chart">
            <h3 className="chartTitle">Monthly Revenue</h3>
            <ResponsiveContainer aspect={2.1/1.05}>
                <LineChart
                    data={LineChartData}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total_cost" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LineChartStatistical
