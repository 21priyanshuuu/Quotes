import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [quote, setQuote] = useState("");
  const [savedQuotes, setSavedQuotes] = useState([]);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get(
        "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
      );
      setQuote(response.data[0]);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  const handleSave = () => {
    if (!savedQuotes.includes(quote)) {
      setSavedQuotes([...savedQuotes, quote]);
    }
  };

  return (
    <div className="container">
      <div className="quote-card">
        <p className="quote">{quote}</p>
        <button onClick={fetchQuote} className="btn">
          Get New Quote
        </button>
        <button onClick={handleSave} className="btn">
          Save
        </button>
      </div>
      <div className="saved-quotes">
        <h2 className="SavedQts">Saved Quotes</h2>
        {savedQuotes.map((quote, index) => (
          <div key={index} className="saved-quote">
            <p>{quote}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
