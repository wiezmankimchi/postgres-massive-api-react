import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TableList(props) {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios('/api/alltables');
      console.log(results.data);
      setTables(results.data);
    };

    fetchData();
  }, []);

  for (let [key, value] of Object.entries(tables)) {
    console.log(`${key}: ${value}`);
  }

  return (
    <div>
      <h1>TableList</h1>
      {tables.map((table, id) => {
        return <div key={id}>{table}</div>;
      })}
    </div>
  );
}
