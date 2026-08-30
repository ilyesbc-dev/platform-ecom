import { useContext } from "react";
import { UserContext } from "./UserContext";

function Avatar() {
  const user = useContext(UserContext);

  return (
    <div>

      <img
        src={user.img}
        alt="image"
        width="150"
        height="200"
      />

      <h2>Bouchaala {user.name}</h2>
     <b><p> my Age: {user.age}</p></b> 
    
      
    </div>
  );
}

export default Avatar;