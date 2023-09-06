interface AreaSelectorProps {
  data: any[];
  selectedAreas: string[];
  onSelectArea: (area: string) => void;
}

const AreaSelector: React.FC<AreaSelectorProps> = ({
  data,
  selectedAreas,
  onSelectArea,
}) => {
  const areas = [...new Set(data.map((item: any) => item.område))];

  return (
    <div>
      <h3>Välj områden</h3>
      <ul>
        {areas.map((area, index) => (
          <li key={index} className="checkbox-container">
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
