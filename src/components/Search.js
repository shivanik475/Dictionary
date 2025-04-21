import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState();
  const handleSearch = async () => {
    await fetchData();
    setSearch("");
  };

  const fetchData = async () => {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
    );
    const jsonResponse = await response.json();
    setResult(jsonResponse[0]);
    console.log(result);
  };
  return (
    <div>
      <h1>Dictionary</h1>
      <div className="search">
        <input
          placeholder="Enter Word..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="result">
        {result ? (
          <div>
            <h2>Word: {result.word}</h2>
            <p>Part of Speech: {result.meanings[0].partOfSpeech}</p>
            <p>Definition: {result.meanings[0].definitions[0].definition}</p>
            <p>synonyms: {result.meanings[0].synonyms[0]}</p>
            <button onClick={() => window.open(result.sourceUrls[0], "_blank")}>
              Read more
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Search;
