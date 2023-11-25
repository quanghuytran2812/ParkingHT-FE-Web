import "assets/css/linechart.css"
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchDashboard } from "store/dashboard/dashboardSlice";

const LineChartStatistical = () => {

    const dispatch = useDispatch();
    const { listMonthlyPayment } = useSelector((state) => state.dashboard);
    const { token } = useSelector((state) => state.auth);
    const tokenInfo = jwtDecode(token)
    
    useEffect(() => {
        if (tokenInfo.role === "Admin") {
            dispatch(fetchDashboard())
        }
    },[dispatch,tokenInfo.role])

    return (
        <div className="chart">
            <h3 className="chartTitle">Monthly Revenue</h3>
            <ResponsiveContainer aspect={2.1/1.05}>
                <LineChart
                    data={listMonthlyPayment}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="monthInYear" />
                    <YAxis />
                    <Tooltip />
                    <Legend iconType="plainline"/>
                    <Line type="monotone" dataKey="amountInMonth" name="Amount" stroke="#02aab0" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LineChartStatistical
