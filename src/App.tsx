import React, { useEffect, useState } from "react";
import QuestionModal from "./components/QuestionModal";
import TaskCard from "./components/TaskCard";
import { fetchData } from "./api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
  const moveCard = (fromIndex: number, toIndex: number) => {
    const updatedTasks = [...selectedTasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setSelectedTasks(updatedTasks);
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
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <QuestionModal
          data={data}
          addSelectedTasks={addSelectedTasks}
          clearAllTasks={clearAllTasks}
          alreadySelectedTasks={alreadySelectedTasks}
        />
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {selectedTasks.map((task, index) => (
            <TaskCard
              key={task._id}
              index={index}
              task={task}
              moveCard={moveCard}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
