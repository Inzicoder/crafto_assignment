import React, { useState } from 'react';
import axios from 'axios';
import './quoteCreationStyles.css'; // Link the external CSS file
import { useNavigate } from 'react-router-dom';

const QuoteCreationPage = ({ token }) => {
  const [text, setText] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // For success feedback
  const [errorMessage, setErrorMessage] = useState('');     // For error feedback
  const [loading, setLoading] = useState(false);            // For button loading state
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    try {
      const response = await axios.post('https://crafto.app/crafto/v1.0/media/assignment/upload', formData);
      setMediaUrl(response.data.mediaUrl);
    } catch (error) {
      console.error('Image upload failed', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setErrorMessage(''); 
    setSuccessMessage(''); 

    try {
      await axios.post('https://assignment.stage.crafto.app/postQuote', {
        text,
        mediaUrl,
      }, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      // If successful, set success message and reset the form
      setSuccessMessage('Quote created successfully!');
      setText('');
      setMediaUrl('');
      navigate('/quotes')
      

    } catch (error) {
      console.error('Quote creation failed', error);
      setErrorMessage('Failed to create quote. Please try again.');
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="quote-container">
      <h2 className="quote-title">Create Quote</h2>
      <form onSubmit={handleSubmit} className="quote-form">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter quote text"
          className="quote-input"
          required
        />
        <input
          type="file"
          onChange={handleImageUpload}
          className="quote-file-input"
          required
        />
        {mediaUrl && <img src={mediaUrl} alt="Preview" className="quote-preview" />}
        <button type="submit" className="quote-submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Quote'}
        </button>
      </form>

      {/* Success and Error Messages */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default QuoteCreationPage;
