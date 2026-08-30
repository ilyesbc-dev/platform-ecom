import { useState } from "react";

function Ecrire() {
  const [text, setText] = useState("");

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)}
      />

      <h3>{text}</h3>
    </>
  );
}

export default Ecrire;