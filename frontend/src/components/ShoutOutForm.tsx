import firebase from "../firebaseConfig";
import { FormEvent, useRef, useState } from "react";
import { useAuthUser } from "../auth-context";
import ShoutOut from "../model/ShoutOut";
import "./ShoutOutForm.css";

const rootReference = firebase.storage().ref();

interface Props {
  onSubmit: (shoutOut: ShoutOut) => void;
  initialTo?: string;
}

function ShoutOutForm({ onSubmit, initialTo }: Props) {
  const [to, setTo] = useState(initialTo);
  const from = useAuthUser()?.displayName;
  const [message, setMessage] = useState("");

  const fileInputReference = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    const shoutOut: ShoutOut = {
      to: to || "",
      from: from as string,
      message: message,
    };
    const files = fileInputReference.current?.files;
    if (files && files[0]) {
      const file = files[0];
      console.log(file);
      const directoryReference = rootReference.child("images");
      directoryReference
        .child(file.name)
        .put(file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => (shoutOut.image = url));
          console.log(shoutOut.image);
          snapshot.ref.getMetadata().then((url) => {
            console.log(url);
            onSubmit(shoutOut);
          });
        });
    } else {
      // onSubmit(shoutOut)
    }
    // onSubmit(shoutOut);
    setTo("");

    setMessage("");
  }
  return (
    <form className="ShoutOutForm" onSubmit={handleSubmit}>
      <p>
        <label htmlFor="ShoutOutForm_to">Sending To:</label>
        <input
          type="text"
          id="ShoutOutForm_to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </p>
      <p>
        <label htmlFor="ShoutOutForm_from">From:</label>
        <span> {from ?? "Must sign in to submit a Shout Out!"}</span>
      </p>
      <p>
        <label htmlFor="ShoutOutForm_message">Message:</label>
        <textarea
          name="ShoutOutForm_message"
          id="ShoutOutForm_message"
          cols={30}
          rows={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
      </p>
      <p>
        <label htmlFor="file">Upload a photo</label>
        <input type="file" id="file" ref={fileInputReference} />
      </p>
      <button type="submit">Send</button>
    </form>
  );
}

export default ShoutOutForm;
