import { FormEvent, useState } from "react";
import ShoutOut from "../model/ShoutOut";
import "./ShoutOutForm.css";

interface Props {
  onSubmit: (shoutOut: ShoutOut) => void;
}

function ShoutOutForm({ onSubmit }: Props) {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    const shoutOut: ShoutOut = {
      to: to,
      from: from,
      message: message,
    };
    onSubmit(shoutOut);
    setTo("");
    setFrom("");
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
        <input
          type="text"
          id="ShoutOutForm_from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
      </p>
      <p>
        <label htmlFor="ShoutOutForm_message">Message:</label>
        <input
          type="text"
          id="ShoutOutForm_message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </p>
      <button type="submit">Send</button>
    </form>
  );
}

export default ShoutOutForm;
