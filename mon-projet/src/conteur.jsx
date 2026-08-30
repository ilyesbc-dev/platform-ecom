import { useState, useEffect } from "react";

function Counteur() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  function dincrease() {
    setCount(count - 1);
  }

  useEffect(() => {
    document.title = `you clicked ${count} times`;
  }, [count]);

  return (
    <>
      <button onClick={increase}>add</button>

      <button onClick={dincrease}>minus</button>

      <button onClick={() => setCount(count + 1)}>
        click me
      </button>

      <h2>{count}</h2>
    </>
  );
}

export default Counteur;