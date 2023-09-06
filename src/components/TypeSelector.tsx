// TypeSelector.tsx
import React from 'react';

interface TypeSelectorProps {
  data: any[];
  selectedGoals: string[];
  onSelectType: (type: string) => void;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({ data, selectedGoals, onSelectType }) => {
  const filteredData = data.filter(item => selectedGoals.includes(item.lärandemål));

  const groupedTypes: Record<string, string[]> = {};

  filteredData.forEach(item => {
    const goal = item.lärandemål;
    const type = item.typ;
    if (!groupedTypes[goal]) {
      groupedTypes[goal] = [];
    }
    if (!groupedTypes[goal].includes(type)) {
      groupedTypes[goal].push(type);
    }
  });

  return (
    <div> {/* Tog bort className="grid-container" */}
      {Object.keys(groupedTypes).map((goal, index) => (
        <div key={index}> {/* Tog bort className="grid-item" */}
          <h3>{goal}</h3>
          <ul>
            {groupedTypes[goal].map((type, index) => (
              <li key={index} className="checkbox-container">
                <input
                  type="checkbox"
                  onChange={() => onSelectType(type)}
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
