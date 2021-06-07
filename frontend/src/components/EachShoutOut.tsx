import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShoutOut from "../model/ShoutOut";
import {
  createShoutOut,
  readAllShoutOuts,
  readEachShoutOut,
} from "../service/ShoutOutApiService";
import ShoutOutCard from "./ShoutOutCard";
import ShoutOutForm from "./ShoutOutForm";

interface RouteParams {
  to: string;
}

function EachShoutOut() {
  const { to } = useParams<RouteParams>();
  const [shoutOuts, setShoutOuts] = useState<ShoutOut[]>([]);

  useEffect(() => {
    readEachShoutOut(to).then((shoutOutsFromApi) =>
      setShoutOuts(shoutOutsFromApi)
    );
  }, [to]);
  function handleAddShoutOut(shoutOut: ShoutOut): void {
    createShoutOut(shoutOut).then(readAllShoutOuts);
  }

  return (
    <div className="EachShoutOut">
      <h2>Shout Outs!</h2>

      {shoutOuts.map((eachShoutOut) => (
        <ShoutOutCard key={eachShoutOut._id} shoutOut={eachShoutOut} />
      ))}
      <h2>Add a Shout Out!</h2>
      <ShoutOutForm onSubmit={handleAddShoutOut} />
    </div>
  );
}
export default EachShoutOut;
