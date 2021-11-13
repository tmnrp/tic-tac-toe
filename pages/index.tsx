import { Board } from "../components/Board";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Board mode={3} />
    </div>
  );
};

export default Home;
