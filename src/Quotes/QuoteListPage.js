import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './QuotesList.css'
import { useNavigate } from 'react-router-dom';

const QuoteListPage = ({ token }) => {
const navigate = useNavigate()
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://assignment.stage.crafto.app/getQuotes?limit=20&offset=${offset}`, {
        headers: {
          Authorization: token
        }
      });

 
      const fetchedQuotes = response.data.quotes || response.data.data || response.data; // Adjust based on actual structure

      if (!Array.isArray(fetchedQuotes)) {
        console.error("Fetched data is not an array");
        return;
      }

      if (fetchedQuotes.length === 0) return; 

      setQuotes((prev) => [...prev, ...fetchedQuotes]);
      setOffset((prevOffset) => prevOffset + 20);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch quotes", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  return (
    <div>
      <h2>Quotes</h2>
      <div>
        {quotes.map((quote) => (
          <div key={quote.id} className="quote">
            <div className="quote-image">
              <img src={quote.mediaUrl} alt="quote" />
              <div className="quote-text">{quote.text}</div>
            </div>
            <div className="quote-info">
              <p>{quote.username}</p>
              <p>{new Date(quote.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      <button onClick={fetchQuotes} disabled={loading}>
        {loading ? 'Loading...' : 'Load More'}
      </button>

      <button
        onClick={() => navigate('/create-quote')} 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      >
        + {/* Or any icon to indicate quote creation */}
      </button>
    </div>
  );
};

export default QuoteListPage;
