
import Tcard from "../../../components/tcard";
const GiftCard = () => {
  return (
    <div className="lg:w-[50%] lg:mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[1rem] mb-[2rem] ">
        <Tcard
          type="buy"
          coinName={"gift card"}
          value={Number(10405).toLocaleString()}
        />
        <Tcard
          type="sell"
          coinName={"gift card"}
          value={Number(10405).toLocaleString()}
        />
      </div>
    </div>
  );
}

export default GiftCard;