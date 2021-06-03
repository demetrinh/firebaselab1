import React, { useEffect, useState } from "react";
import ShoutOut from "../model/ShoutOut";
import {
  createShoutOut,
  readAllShoutOuts,
} from "../service/ShoutOutApiService";
import ShoutOutCard from "./ShoutOutCard";
import ShoutOutForm from "./ShoutOutForm";

function ShoutOutList() {
  const [shoutOuts, setShoutOuts] = useState<ShoutOut[]>([]);

  useEffect(() => {
    readAllShoutOuts().then((shoutOutsFromApi) =>
      setShoutOuts(shoutOutsFromApi)
    );
  }, []);
  function handleAddShoutOut(shoutOut: ShoutOut): void {
    createShoutOut(shoutOut).then(readAllShoutOuts);
  }

  return (
    <div className="ShoutOutList">
      <h2>Shout Outs!</h2>
      {shoutOuts.map((eachShoutOut) => (
        <ShoutOutCard key={eachShoutOut._id} shoutOut={eachShoutOut} />
      ))}
      <h2>Add a Shout Out!</h2>
      <ShoutOutForm onSubmit={handleAddShoutOut} />
    </div>
  );
}
export default ShoutOutList;
