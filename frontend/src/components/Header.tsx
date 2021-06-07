import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth-context";
import { signInWithGoogle, signOut } from "../firebaseConfig";

function Header() {
  const { user } = useContext(AuthContext);
  return (
    <header className="Header">
      <h1>Shout Outs!</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={signOut}>Sign Out</button>
      {user && <div>Welcome {user.displayName}!</div>}
      {!!user?.photoURL && <img src={user.photoURL} alt="" />}
      <nav>
        <ul>
          <li>
            <NavLink to="/">All Recipients</NavLink>
          </li>
          <li>
            <NavLink to="/routes/Bella">Messages to Bella</NavLink>
          </li>
          <li>
            <NavLink to="/routes/Yara">Messages to Yara</NavLink>
          </li>
          <li>
            <NavLink to="/routes/Zion">Messages to Zion</NavLink>
          </li>
          <li>
            <NavLink to="/routes/Amber">Messages to Amber</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
