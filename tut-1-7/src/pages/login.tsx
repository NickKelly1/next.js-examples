import { useRef, useState } from "react";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<any>(null);

  async function handleLogin() {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passRef.current.value,
      })
    });
    const json = await res.json();
    setMessage(json);
  }


  return (
    <div>
      {message && <pre>{JSON.stringify(message, null, 2)}</pre>}
      <div>
        <input type="text" placeholder="email" ref={emailRef} />
      </div>
      <div>
        <input type="password" placeholder="password" ref={passRef} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}