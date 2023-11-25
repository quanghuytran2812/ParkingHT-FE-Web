import icons from "ultils/icons"
import path from "./path";

const {
    DashboardOutlinedIcon,
    AccountCircleOutlinedIcon,
    CategoryIcon,
    AirportShuttleIcon,
    LocalParkingIcon,
    BookIcon,
    ReportIcon,
    FeedbackIcon,
    MapIcon
} = icons;
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
    },
    {
        id: 3,
        value: 'Manage Feedback',
        paths: `/dashboard/feedback`,
        icon: <FeedbackIcon size={20} />
    },
    {
        id: 4,
        value: 'Manage Category',
        paths: `/dashboard/vehiclecategory`,
        icon: <CategoryIcon size={20} />
    },
    {
        id: 5,
        value: 'Manage Vehicle',
        paths: `/dashboard/vehicle`,
        icon: <AirportShuttleIcon size={20} />
    },
    {
        id: 6,
        value: 'Manage ParkingSlot',
        paths: `/dashboard/parkingslot`,
        icon: <LocalParkingIcon size={20} />
    },
    {
        id: 7,
        value: 'Manage Booking',
        paths: `/dashboard/booking`,
        icon: <BookIcon size={20} />
    },
    {
        id: 8,
        value: 'Manage Report',
        paths: `/dashboard/report`,
        icon: <ReportIcon size={20} />
    },
    {
        id: 9,
        value: 'Diagram ParkingSlot',
        paths: `/dashboard/diagramparkingslot`,
        icon: <MapIcon size={20} />
    }
];

export const statusReportData = [
    { code: 0, value: 'Processing' },
    { code: 1, value: 'Completed' }
]

export const statusParkingSlotData = [
    { code: 'AVAILABLE', value: 'AVAILABLE' },
    { code: 'BUSY', value: 'BUSY' }
]

export const roleUserData = [
    { code: 'MANAGER', value: 'MANAGER' },
    { code: 'DRIVER', value: 'DRIVER' }
]