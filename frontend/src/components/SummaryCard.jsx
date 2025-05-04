import React, { useEffect, useState } from 'react';

export default function SummaryCard({
  selectedImages = [],
  hashtags = [],
  budget = 0,
  months = []
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const response = await fetch('http://localhost:8000/api/suggestions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            images: selectedImages,
            hashtags,
            budget,
            months,
          }),
        });

        const data = await response.json();
        setSuggestions(data.destinations || []);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDestinations();
  }, [selectedImages, hashtags, budget, months]);

  return (
    <div style={{ color: 'white', textAlign: 'center', marginTop: '4rem' }}>
      <h2>🎉 Summary</h2>
      <p><strong>Images:</strong> {selectedImages.length}</p>
      <p><strong>Hashtags:</strong> {hashtags.join(', ') || '–'}</p>
      <p><strong>Budget:</strong> €{budget || '–'}</p>
      <p><strong>Months:</strong> {months.join(', ') || '–'}</p>

      <h3 style={{ marginTop: '2rem' }}>🌍 Suggested Destinations:</h3>
      {loading ? (
        <p>Loading suggestions...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {suggestions.length > 0 ? (
            suggestions.map((dest, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{dest}</li>
            ))
          ) : (
            <p>No destinations found.</p>
          )}
        </ul>
      )}
    </div>
  );
}
