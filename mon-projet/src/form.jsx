import { useState } from "react";
import "./form.css";

function Email() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }

    alert("Form submitted");
  }

  return (
    <form onSubmit={handleSubmit}>

      <div>
        <label>Email:</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /> <br />
      </div>

      <div>
        <label>Password:</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
      </div>

      <button className="btn" type="submit">
        Login
      </button>

    </form>
  );
}

export default Email;