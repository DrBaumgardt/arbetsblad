export const fetchData = async () => {
    const response = await fetch('http://localhost:3001/api/data');
    const data = await response.json();
    return data;
  };
  