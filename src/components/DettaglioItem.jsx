import { useParams } from "react-router-dom";

const DettaglioItem = () => {
  const param = useParams();
  return <>{console.log(param.item_id)}</>;
};

export default DettaglioItem;
