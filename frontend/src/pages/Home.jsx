import Clients from "../components/ui/Clients";
import HeroMain from "../components/ui/HeroMain";
import Navbar from "../components/ui/Navbar";
import Process from "../components/ui/Process";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroMain />
      <Process />
      <Clients />
    </div>
  );
};

export default Home;
