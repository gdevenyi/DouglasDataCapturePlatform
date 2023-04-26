import React from 'react';

import {
  CartesianGrid,
  ErrorBar,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { ConditionalKeys } from 'type-fest';

/** An array of arbitrary objects with data to graph  */
type LineGraphData = readonly object[];

/** Extract string keys from items in `T` where the value of `T[K]` extends `K` */
type ExtractValidKeys<T extends LineGraphData, K> = Extract<ConditionalKeys<T[number], K>, string>;

// eslint-disable-next-line react/function-component-definition
export function LineGraph<const T extends LineGraphData>({
  data,
  lines,
  xAxis,
  yAxis,
  legend
}: {
  /** An array of objects, where each object represents one point on the x-axis */
  data: T;
  lines: Array<{
    name: string;
    val: ExtractValidKeys<T, number>;
    err: ExtractValidKeys<T, number>;
  }>;
  xAxis?: {
    key?: ExtractValidKeys<T, string>;
    label?: string;
  };
  yAxis: {
    label?: string;
  };
  legend?: {
    position: 'top' | 'right';
  };
}) {
  return (
    <ResponsiveContainer height={400} width="100%">
      <LineChart className="border" data={[...data]} margin={{ left: 10, right: 10, bottom: 5, top: 5 }}>
        <CartesianGrid stroke={'#ccc'} strokeDasharray="5 5" />
        <XAxis dataKey={xAxis?.key} height={50} padding={{ left: 20, right: 20 }}>
          <Label offset={5} position="insideBottom" value={xAxis?.label} />
        </XAxis>
        <YAxis width={70}>
          <Label angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} value={yAxis.label} />
        </YAxis>
        <Tooltip />
        <Legend
          align={legend?.position === 'right' ? 'right' : 'center'}
          height={36}
          layout={legend?.position === 'right' ? 'vertical' : 'horizontal'}
          verticalAlign={legend?.position === 'right' ? 'middle' : 'top'}
          wrapperStyle={
            legend?.position === 'right'
              ? {
                  paddingLeft: '1rem'
                }
              : undefined
          }
        />
        {lines.map(({ name, val, err }) => (
          <Line dataKey={val} key={val} name={name} stroke={'black'} type="monotone">
            <ErrorBar dataKey={err} />
          </Line>
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
