import { useState } from "react";
function Counte () {
const [Counte, setCounte] = useState(0);

  function increase() {
    setCounte(Counte + 1);
  }
return (
    <>
      <button onClick={increase}>add</button>

      <h2>{count}</h2>
    </>
  );
}


export default Counte;



