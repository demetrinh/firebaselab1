import { useContext } from "react";
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
    </header>
  );
}

export default Header;
