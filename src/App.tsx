import React, { useState } from 'react';
import { Gifs, useGiphy } from './useGiphy';

import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState<string>('');
  const [gifs, loading] = useGiphy(query);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setQuery(search);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <div className="App">
      <h1>Giphy Search</h1>
      <form onSubmit={onSubmit}>
        <input
          value={search}
          onChange={onChange}
          placeholder="What are you looking for?"
        />
        <button type="submit">Search</button>
      </form>
      <br />
      {loading ? <h2>GIMME GIFS!</h2> : (gifs as Gifs).map(gif => (
        <video autoPlay loop key={String(gif)} src={String(gif)} />
      ))}
    </div>
  );
}

export default App;
