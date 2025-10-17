import React, { useState, useEffect } from "react";
import "./Forms.css";

function PokemonForm() {
  const [form, setForm] = useState({
    nome: "",
    tipo: "",
    descricao: "",
    poder: 50,
  });
  const [errors, setErrors] = useState({});
  const [pokemons, setPokemons] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  // Carrega Pokémons do localStorage
  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("pokemons")) || [];
    setPokemons(dados);
  }, []);

  useEffect(() => {
    localStorage.setItem("pokemons", JSON.stringify(pokemons));
  }, [pokemons]);

  const tipos = [
    { value: "fogo", label: "🔥 Fogo" },
    { value: "agua", label: "💧 Água" },
    { value: "grama", label: "🌱 Grama" },
    { value: "eletrico", label: "⚡ Elétrico" },
    { value: "psiquico", label: "🧠 Psíquico" },
    { value: "pedra", label: "🪨 Pedra" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "poder" ? +value : value });
  };

  const validate = () => {
    const errs = {};
    if (!form.nome.trim()) errs.nome = "Nome é obrigatório.";
    if (!form.tipo.trim()) errs.tipo = "Tipo é obrigatório.";
    if (form.descricao.length > 300)
      errs.descricao = "Máximo de 300 caracteres.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    const novoPokemon = { ...form, id: Date.now() };
    setPokemons([...pokemons, novoPokemon]);
    setForm({ nome: "", tipo: "", descricao: "", poder: 50 });
    setErrors({});
    setSuccessMsg("Pokémon cadastrado!");

    setTimeout(() => setSuccessMsg(""), 2000);
  };

  return (
    <div className="container">
      <h2>Cadastro de Pokémon</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Nome do Pokémon</label>
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Ex: Pikachu"
        />
        {errors.nome && <div className="error">{errors.nome}</div>}

        <label>Tipo</label>
        <select name="tipo" value={form.tipo} onChange={handleChange}>
          <option value="">Selecione...</option>
          {tipos.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {errors.tipo && <div className="error">{errors.tipo}</div>}

        <label>Descrição</label>
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          rows={3}
          placeholder="Breve descrição do Pokémon..."
        />
        {errors.descricao && <div className="error">{errors.descricao}</div>}

        <label>Poder ({form.poder})</label>
        <input
          type="number"
          name="poder"
          min={0}
          max={100}
          value={form.poder}
          onChange={handleChange}
          className="number-input"
        />


        <button type="submit">Cadastrar</button>
        {successMsg && <div className="success">{successMsg}</div>}
      </form>

      {pokemons.length > 0 && (
        <div className="lista">
          <h3>Pokémons cadastrados:</h3>
          <ul>
            {pokemons.map((p) => (
              <li key={p.id}>
                <strong>{p.nome}</strong> — {tipos.find(t => t.value === p.tipo)?.label || p.tipo}
                <div>{p.descricao}</div>
                <div>Poder: {p.poder}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonForm;