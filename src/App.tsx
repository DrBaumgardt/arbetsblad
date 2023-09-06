import React, { useEffect, useState } from 'react';
import QuestionModal from './components/QuestionModal';
import { fetchData } from './api';
import './App.css';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      if (fetchedData && fetchedData.length > 0) {
        setData(fetchedData);  // Sätt hela datalistan
      }
    };

    getData();
  }, []);

  return (
    <div className="App">
      <QuestionModal data={data} />
    </div>
  );
};

export default App;
