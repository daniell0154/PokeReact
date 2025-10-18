import React, { useState, useEffect } from "react";
import "./Forms.css";

function Forms() {
  const [form, setForm] = useState({
    nome: "",
    tipo: "",
    descricao: "",
    poder: "",
  });
  const [errors, setErrors] = useState({});
  const [pokemons, setPokemons] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

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
    setForm({ ...form, [name]: value });
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

    const novoId = pokemons.length > 0 ? pokemons[pokemons.length - 1].id + 1 : 1;

    const novoPokemon = { ...form, id: novoId };
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
          placeholder="Descrição do Pokémon (máximo de 300 caracteres)"
        />
        {errors.descricao && <div className="error">{errors.descricao}</div>}

        <label>
          Poder {form.poder !== "" ? `(${form.poder})` : ""}
        </label>
        <input
          type="number"
          name="poder"
          min={0}
          max={100}
          value={form.poder}
          onChange={handleChange}
          className="number-input"
          placeholder="Ex: 80"
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
                {p.poder !== null && <div>Poder: {p.poder}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Forms;