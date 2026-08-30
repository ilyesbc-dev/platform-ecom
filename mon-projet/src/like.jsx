import { useState } from "react";

function Like() {
  const [emojie, setEmojie] = useState(20);

  function Emojieplus() {
    setEmojie(emojie + 10);
  }

  return (
    <>
      <div
        style={{
          fontSize: emojie,
          
        }}
      >
        😀
      </div>
<br />
      <button onClick={Emojieplus}>click</button>
    </>
  );
}

export default Like;