import React, { useEffect, useState } from "react";
import QuestionModal from "./components/QuestionModal";
import TaskCard from "./components/TaskCard"; // Importera den nya TaskCard-komponenten
import { fetchData } from "./api";

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<any[]>([]);

  const addSelectedTasks = (newTasks: any[]) => {
    setSelectedTasks([...selectedTasks, ...newTasks]);
  };

  const clearAllTasks = () => {
    setSelectedTasks([]); // Rensa alla valda uppgifter
  };

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      if (fetchedData && fetchedData.length > 0) {
        setData(fetchedData);
      }
    };

    getData();
  }, []);

  return (
    <div className="App">
      <QuestionModal
        data={data}
        addSelectedTasks={addSelectedTasks}
        clearAllTasks={clearAllTasks}
      />
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {selectedTasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>
    </div>
  );
};

export default App;
