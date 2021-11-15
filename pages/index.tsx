import { Board } from "../components/Board";

const Home = () => {
  return (
    <div
      className={`flex justify-center items-center h-screen bg-gradient-to-br from-blue-700 to-green-600 text-white`}
    >
      <Board mode={3} />
    </div>
  );
};

export default Home;
