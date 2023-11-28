import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGetUser } from "../redux/action/UserAction";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchGetUser(token));
    }
  }, []);
  return <h1>Ciao</h1>;
};
export default Home;
