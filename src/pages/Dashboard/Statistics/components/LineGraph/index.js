import {Text, View} from 'components';
import {ACCENT_COLOR, BACKGROUND_COLOR4, LINEGRAPH_COLORS, WHITE} from 'constants/colors';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {hp, manipulateData} from 'utils/helper';
import styles from './.module.css';

export default function LineGraph({data = [], top3Products = [], filteredDate}) {
  return (
    <View style={styles.mainPane}>
      <AreaChart
        className={styles.graph}
        width={hp(150)}
        height={hp(35)}
        data={manipulateData(data, filteredDate, top3Products)}
        margin={{
          top: hp(2),
          right: hp(5),
          left: -hp(5),
        }}>
        <CartesianGrid strokeDasharray='5' opacity={0.5} />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip
          separator=' +'
          labelStyle={{color: WHITE, fontSize: hp(2), marginBottom: '1vh'}}
          itemStyle={{
            padding: '0.25vh 0',
            margin: 0,
          }}
          contentStyle={{
            backgroundColor: BACKGROUND_COLOR4,
            border: 'none',
            borderRadius: '1vh',
            boxShadow: '0.25vh 0.25vh 0.8vh rgba(0, 0, 0, 0.5)',
          }}
        />
        {top3Products.map(({product}, index) => (
          <Area
            key={index}
            type='monotone'
            opacity={0.65}
            stroke={LINEGRAPH_COLORS[index]}
            fill={LINEGRAPH_COLORS[index]}
            dataKey={product}
            activeDot={{r: 5}}
          />
        ))}
      </AreaChart>
    </View>
  );
}
