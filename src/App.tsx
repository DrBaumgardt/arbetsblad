import React, { useEffect, useState } from "react";
import QuestionModal from "./components/QuestionModal";
import TaskCard from "./components/TaskCard";
import { fetchData } from "./api";

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<any[]>([]);
  const [alreadySelectedTasks, setAlreadySelectedTasks] = useState<string[]>(
    []
  );

  const addSelectedTasks = (newTasks: any[]) => {
    const newSelectedTasks = [...selectedTasks, ...newTasks];
    setSelectedTasks(newSelectedTasks);
    setAlreadySelectedTasks([
      ...alreadySelectedTasks,
      ...newTasks.map((task) => task._id),
    ]);
  };

  const clearAllTasks = () => {
    setSelectedTasks([]);
    setAlreadySelectedTasks([]); // Clear the list of already selected tasks
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
        alreadySelectedTasks={alreadySelectedTasks} // Pass down the list of already selected tasks
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
