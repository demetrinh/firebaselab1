import ShoutOut from "../model/ShoutOut";
import "./ShoutOutCard.css";

interface Props {
  shoutOut: ShoutOut;
}

function ShoutOutCard({ shoutOut }: Props) {
  return (
    <div className="ShoutOutCard">
      <h3>Shout out to {shoutOut.to}</h3>
      <p className="ShoutOutCard_from">- from {shoutOut.from}</p>
      <p>{shoutOut.message}</p>
      {!!shoutOut.image && <img src={shoutOut.image} alt="" />}
    </div>
  );
}
export default ShoutOutCard;
