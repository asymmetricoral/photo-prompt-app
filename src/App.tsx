import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson.username);

    setName("");
  }

  return (
    <>
      <p>Prompt: butterflies</p>
      <form method="post" onSubmit={handleSubmit}>
        <input 
          type="text"
          name="username"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value) }
          placeholder="Enter your name"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default App
