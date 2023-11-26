import "assets/css/home.css"
import { CircleChart, LineChartStatistical, Retroclock, StatsCard } from "../../components";

const Home = () => {

  return (
    <div className="home">
      <header>
        <h1 className="homeTitle">Bảng điều khiển</h1>
      </header>
      <hr className="homeHr" />
      <div className="homeContainer">
        <main className="homeMain">
          <StatsCard />
          <LineChartStatistical />
        </main>
        <aside className="homeAside">
          <CircleChart />
          <Retroclock />
        </aside>
      </div>
    </div>
  );
};

export default Home;
