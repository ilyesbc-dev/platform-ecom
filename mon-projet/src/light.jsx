import { useState } from "react";

function Light() {
  const [light, setLight] = useState(false);

  function lightone() {
    setLight(true);
  }

  function lightoff() {
    setLight(false);
  }

  return (
    <>
      <button onClick={lightone}>Turnon</button>

      <button onClick={lightoff}>Turnoff</button>

      <p>{light ? "light on" : "Light off"}</p>
    </>
  );
}

export default Light;