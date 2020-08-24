import { useRef, useState } from "react";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<any>(null);

  async function handleSignup() {
    const res = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value,
      })
    });
    const json = await res.json();
    setMessage(json);
  }


  return (
    <div>
      <h1>Create a new user</h1>
      {message && <pre>{JSON.stringify(message, null, 2)}</pre>}
      <div>
        <input type="text" placeholder="name" ref={nameRef} />
      </div>
      <div>
        <input type="text" placeholder="email" ref={emailRef} />
      </div>
      <div>
        <input type="password" placeholder="password" ref={passRef} />
      </div>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}