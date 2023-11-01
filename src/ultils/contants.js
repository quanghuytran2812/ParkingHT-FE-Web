import icons from "../ultils/icons"
import path from "./path";

const { DashboardOutlinedIcon, AccountCircleOutlinedIcon } = icons;
export const sidebarItemData = [
    {
        id: 1,
        value: 'Dashboard',
        paths: `${path.DASHBOARD}`,
        icon: <DashboardOutlinedIcon size={20} />
    },
    {
        id: 2,
        value: 'Manage User',
        paths: `/dashboard/userlist`,
        icon: <AccountCircleOutlinedIcon size={20} />
    }
];

export const LineChartData = [
    {
        "month": "January",
        "total_cost": 4000
    },
    {
        "month": "February",
        "total_cost": 3000
    },
    {
        "month": "March",
        "total_cost": 2000
    },
    {
        "month": "April",
        "total_cost": 2780
    },
    {
        "month": "May",
        "total_cost": 1890
    }
]

 export const CicleChartData = [
    { name: 'Adela', value: 100 },
    { name: 'Agnes', value: 300 },
    { name: 'Alida', value: 100 },
    { name: 'Almira', value: 80 }
]