import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Forms from './components/Forms.jsx'

function App() {
  const [count, setCount] = useState(0)

  const handleAdd = (novoPokemon) => {
    console.log("Novo Pokémon adicionado:", novoPokemon);
  };

  return (
    <div>
      <Forms onAdd={handleAdd} />
    </div>
  );
}

export default App
