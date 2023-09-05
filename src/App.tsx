import React, { useEffect, useState } from 'react';
import QuestionModal from './components/QuestionModal';
import { fetchData } from './api';

const App: React.FC = () => {
  const [areas, setAreas] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      if (fetchedData && fetchedData.length > 0) {
        const areaList: string[] = [];
        const goalList: string[] = [];
        const typeList: string[] = [];

        fetchedData.forEach((item: any) => {
          areaList.push(item.område);
          goalList.push(item.lärandemål);
          typeList.push(item.typ);
        });

        setAreas([...new Set(areaList)]);
        setGoals([...new Set(goalList)]);
        setTypes([...new Set(typeList)]);
        setData(fetchedData);  // Sätt hela datalistan
      }
    };

    getData();
  }, []);

  return (
    <div className="App">
      <h1>Uppgifter från MongoDB</h1>
      {/* Skicka även hela datalistan som en prop */}
      <QuestionModal areas={areas} goals={goals} types={types} data={data} />
    </div>
  );
};

export default App;
