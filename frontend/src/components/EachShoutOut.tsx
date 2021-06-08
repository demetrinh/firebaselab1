import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShoutOut from "../model/ShoutOut";
import {
  createShoutOut,
  deleteShoutOut,
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
  const [shoutOutsLoaded, setShoutOutsLoaded] = useState(false);

  useEffect(() => {
    loadShoutOuts(to);
  }, [to]);

  function loadShoutOuts(to: string) {
    readEachShoutOut(to).then((shoutOutsFromApi) => {
      setShoutOuts(shoutOutsFromApi);
      setShoutOutsLoaded(true);
    });
  }

  function handleAddShoutOut(shoutOut: ShoutOut): void {
    createShoutOut(shoutOut).then(() => loadShoutOuts(to));
  }

  function handleDeleteShoutOut(shoutOutId: string): void {
    deleteShoutOut(shoutOutId).then(() => loadShoutOuts(to));
  }

  return (
    <div className="EachShoutOut">
      <h2>Shout Outs!</h2>
      {!shoutOutsLoaded ? (
        <p>Loading...</p>
      ) : shoutOuts.length === 0 ? (
        <p>No Shout Outs </p>
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
      <ShoutOutForm onSubmit={handleAddShoutOut} initialTo={to} />
    </div>
  );
}
export default EachShoutOut;
