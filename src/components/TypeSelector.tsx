import React from "react";

interface TypeSelectorProps {
  data: any[];
  selectedGoals: string[];
  onSelectType: (type: string, count: number) => void;
  typeCounts: Record<string, number>;
  setTypeCounts: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({
  data,
  selectedGoals,
  onSelectType,
  typeCounts,
  setTypeCounts,
}) => {
  const findAreaForGoal = (goal: string) => {
    const goalData = data.find((item) => item.lärandemål === goal);
    return goalData ? goalData.område : "Unknown";
  };

  const filteredData = data.filter((item) =>
    selectedGoals.includes(item.lärandemål)
  );

  const groupedTypes: Record<string, string[]> = {};

  filteredData.forEach((item) => {
    const goal = item.lärandemål;
    const type = item.typ;
    if (!groupedTypes[goal]) {
      groupedTypes[goal] = [];
    }
    if (!groupedTypes[goal].includes(type)) {
      groupedTypes[goal].push(type);
    }
  });

  const handleInputChange = (type: string, value: number) => {
    setTypeCounts({ ...typeCounts, [type]: value }); // Här används setTypeCounts från props
    onSelectType(type, value);
  };

  return (
    <div className="worksheetMenu">
      {Object.keys(groupedTypes).map((goal, index) => (
        <div key={index} className="area">
          <h3 className="fs-4">{findAreaForGoal(goal)}</h3>
          <h3 className="fs-5">{goal}</h3>
          <ul>
            {groupedTypes[goal].map((type, index) => (
              <li key={index} className="checkbox-container">
                <input
                  type="number"
                  min="0"
                  className="narrow-number-input"
                  value={typeCounts[type] || 0}
                  onChange={(e) =>
                    handleInputChange(type, parseInt(e.target.value))
                  }
                />
                {type}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TypeSelector;
