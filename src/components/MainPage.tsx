import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MainPage: React.FC = () => {
  // State för att lagra data hämtad från backenden
  const [data, setData] = useState<any[]>([]);

  // useEffect för att hämta data när komponenten monteras
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/data');
        setData(response.data);
        console.log("Hämtad data:", response.data);
      } catch (error) {
        console.error('Det gick inte att hämta data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Main Page</h1>
      {/* Rendera data här */}
    </div>
  );
};

export default MainPage;
