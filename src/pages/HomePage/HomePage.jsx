import { useSelector } from "react-redux";

const HomePage = () => {
  const name = useSelector((state) => state.users.user.name);

  return <>{name ? <h1>Welcome {name}</h1> : <h1>Welcome citizen</h1>}</>;
};

export default HomePage;
