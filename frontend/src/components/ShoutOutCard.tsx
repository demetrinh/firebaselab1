import ShoutOut from "../model/ShoutOut";
import "./ShoutOutCard.css";

interface Props {
  shoutOut: ShoutOut;
  onDelete: () => void;
}

function ShoutOutCard({ shoutOut, onDelete }: Props) {
  return (
    <div className="ShoutOutCard">
      <h3>Shout out to {shoutOut.to}</h3>
      <button onClick={onDelete}>Delete</button>
      <p className="ShoutOutCard_from">- from {shoutOut.from}</p>
      <p>{shoutOut.message}</p>
      {!!shoutOut.image && (
        <img className="ShoutOutCard_image" src={shoutOut.image} alt="" />
      )}
    </div>
  );
}
export default ShoutOutCard;
