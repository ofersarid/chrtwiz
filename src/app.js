import React, { useState, useEffect } from 'react';
import ChrtWiz from './chrt-wiz/chrt-wiz';
// import styles from './styles.scss';

const getValueText = v => {
  switch (true) {
    case v < 80:
      return 'notice';
    case v < 90:
      return 'healthy';
    default:
      return 'optimal';
  }
};

const getValueColor = v => {
  switch (true) {
    case v < 80:
      return 'red';
    case v < 90:
      return 'orange';
    default:
      return 'green';
  }
};

const generateData = (init) => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    const v = init ? 0 : Math.floor(Math.min(Math.abs(Math.random() + 0.5), 0.99) * 100);
    data.push({
      v,
      t: getValueText(v),
      c: getValueColor(v),
      l: `Service ${i + 1}`
    })
  }
  return data;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(generateData(true));

  const promise = () => new Promise(resolve => {
    setTimeout(() => {
      resolve(generateData());
    }, 1000);
  });

  async function fetchData() {
    setLoading(true);
    const data = await promise();
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData();
      setInterval(fetchData, 5000);
    }, 0)
  }, []);

  return (
    <div >
      <ChrtWiz data={data} triggerValueTextOnClick className="my-chart" />
    </div >
  );
};

export default App;
