import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '1',
    weight: 8500,
    amt: 2400,
  },
  {
    name: '2',
    weight: 8700,
    amt: 2210,
  },
  {
    name: '3',
    weight: 8700,
    amt: 2290,
  },
  {
    name: '4',
    weight: 9200,
    amt: 2000,
  },
  {
    name: '5',
    weight: 9100,
    amt: 2181,
  },
  {
    name: '6',
    weight: 9800,
    amt: 2500,
  },
  {
    name: '8',
    weight: 9600,
    amt: 2100,
  },
  {
    name: '9',
    weight: 10100,
    amt: 2100,
  },
  {
    name: '10',
    weight: 10700,
    amt: 2100,
  },
  {
    name: '11',
    weight: 11100,
    amt: 2100,
  },
  {
    name: '12',
    weight: 10800,
    amt: 2100,
  },
  {
    name: '13',
    weight: 10600,
    amt: 2100,
  },
  {
    name: '14',
    weight: 11000,
    amt: 2100,
  },
  {
    name: '15',
    weight: 10500,
    amt: 2100,
  },
  {
    name: '16',
    weight: 10500,
    amt: 2100,
  },
  {
    name: '17',
    weight: 10600,
    amt: 2100,
  },
  {
    name: '18',
    weight: 11100,
    amt: 2100,
  },
  {
    name: '19',
    weight: 11300,
    amt: 2100,
  },
  {
    name: '20',
    weight: 11700,
    amt: 2100,
  },
  {
    name: '21',
    weight: 11300,
    amt: 2100,
  },
  {
    name: '22',
    weight: 11500,
    amt: 2100,
  },
  {
    name: '23',
    weight: 11700,
    amt: 2100,
  },
  {
    name: '24',
    weight: 12100,
    amt: 2100,
  },
  {
    name: '25',
    weight: 12000,
    amt: 2100,
  },
  {
    name: '26',
    weight: 11800,
    amt: 2100,
  },
  {
    name: '27',
    weight: 11600,
    amt: 2100,
  },
  {
    name: '28',
    weight: 11700,
    amt: 2100,
  },
  {
    name: '29',
    weight: 11200,
    amt: 2100,
  },
  {
    name: '30',
    weight: 11300,
    amt: 2100,
  },
];

export default class WeightChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={400}
          height={250}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        > 
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[7000, 13000]} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
