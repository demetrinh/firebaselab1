import React, { useEffect, useState } from "react";
import ShoutOut from "../model/ShoutOut";
import {
  createShoutOut,
  deleteShoutOut,
  readAllShoutOuts,
} from "../service/ShoutOutApiService";
import ShoutOutCard from "./ShoutOutCard";
import ShoutOutForm from "./ShoutOutForm";

function ShoutOutList() {
  const [shoutOuts, setShoutOuts] = useState<ShoutOut[]>([]);
  const [shoutOutsLoaded, setShoutOutsLoaded] = useState(false);

  useEffect(loadShoutOuts, []);

  function loadShoutOuts() {
    readAllShoutOuts().then((shoutOutsFromApi) => {
      setShoutOuts(shoutOutsFromApi);
      setShoutOutsLoaded(true);
    });
  }

  function handleAddShoutOut(shoutOut: ShoutOut): void {
    createShoutOut(shoutOut).then(loadShoutOuts);
  }

  function handleDeleteShoutOut(shoutOutId: string): void {
    deleteShoutOut(shoutOutId).then(loadShoutOuts);
  }

  return (
    <div className="ShoutOutList">
      <h2>Shout Outs!</h2>
      {!shoutOutsLoaded ? (
        <p>Loading...</p>
      ) : shoutOuts.length === 0 ? (
        <p>No Shout Outs</p>
      ) : (
        shoutOuts.map((eachShoutOut) => (
          <ShoutOutCard
            key={eachShoutOut._id}
            shoutOut={eachShoutOut}
            onDelete={() => handleDeleteShoutOut(eachShoutOut._id!)}
          />
        ))
      )}
      <h2>Add a Shout Out!</h2>
      <ShoutOutForm onSubmit={handleAddShoutOut} />
    </div>
  );
}
export default ShoutOutList;
