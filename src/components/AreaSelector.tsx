import React from 'react';

interface AreaSelectorProps {
  areas: string[];
  selectedAreas: string[];
  onSelectArea: (area: string) => void;
}

const AreaSelector: React.FC<AreaSelectorProps> = ({ areas, selectedAreas, onSelectArea }) => {
  return (
    <div>
      <h3>Välj områden</h3>
      <ul>
        {areas.map((area, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={selectedAreas.includes(area)}
              onChange={() => onSelectArea(area)}
            />
            {area}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AreaSelector;
