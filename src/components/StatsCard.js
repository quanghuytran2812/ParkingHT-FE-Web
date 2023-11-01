import "../assets/css/statsCard.css"
import icons from "../ultils/icons"

const StatsCard = () => {
    const {ArrowDownwardIcon,ArrowUpwardIcon,AttachMoneyIcon,GroupAddIcon,LocalParkingIcon} = icons;
    return (
        <div className="StatsCard">
            <div className="StatsCardItem">
                <span className="StatsCardTitle">Total Revenue</span>
                <div className="StatsCardMoneyContainer">
                    <AttachMoneyIcon className="StatsCardIconItem"/>
                    <div className="StatsCardWrapper">
                        <span className="StatsCardMoney">$2,415</span>
                        <span className="StatsCardMoneyRate">
                            <ArrowDownwardIcon className="StatsCardIcon negative" style={{ fontSize: '0.9rem' }}/> <span className="StatsCardIconText negative">-11.4%</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="StatsCardItem lightGreenColor">
                <span className="StatsCardTitle">Newly Driver Registered</span>
                <div className="StatsCardMoneyContainer">
                    <GroupAddIcon className="StatsCardIconItem"/>
                    <div className="StatsCardWrapper">
                        <span className="StatsCardMoney">15</span>
                        <span className="StatsCardMoneyRate">
                            <ArrowDownwardIcon className="StatsCardIcon negative" style={{ fontSize: '0.9rem' }}/> <span className="StatsCardIconText negative">-11.4%</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="StatsCardItem darkGreenColor">
                <span className="StatsCardTitle">Total Spaces Available</span>
                <div className="StatsCardMoneyContainer">
                    <LocalParkingIcon className="StatsCardIconItem"/>
                    <div className="StatsCardWrapper">
                        <span className="StatsCardMoney">30</span>
                        <span className="StatsCardMoneyRate">
                            <ArrowUpwardIcon className="StatsCardIcon" style={{ fontSize: '0.9rem' }}/> <span className="StatsCardIconText">+11.4%</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatsCard
