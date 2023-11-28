import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGetUser } from "../redux/action/UserAction";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzAxMDc2OTAwLCJleHAiOjE3MDE2ODE3MDB9.zW8kAdF6b3XH_Rrh12frZr_-v5CKGb27liDP5wpGy8Y"
    );
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchGetUser(token));
    }
  }, []);
  return <h1>Ciao</h1>;
};
export default Home;
