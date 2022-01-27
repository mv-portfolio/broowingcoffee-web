import {CircleSnail, Text, View} from 'components';
import {ACCENT_COLOR, BACKGROUND_COLOR4, LINEGRAPH_COLORS, WHITE} from 'constants/colors';
import {Area, AreaChart, CartesianGrid, Label, Tooltip, XAxis, YAxis} from 'recharts';
import {hp} from 'utils/helper';
import styles from './.module.css';

export default function LineGraph({
  style: {width = hp(150), height = hp(30)},
  isLoading = true,
  top3Products = [],
  manipulateData = [],
}) {
  return (
    <View style={styles.mainPane}>
      {isLoading ? (
        <View style={styles.loadingPane}>
          <CircleSnail color={ACCENT_COLOR} size={hp(5)} thickness={hp(0.6)} />
        </View>
      ) : (
        <View style={styles.graphPane}>
          <View style={styles.upperPane}>
            <View style={styles.yPane}>
              <Text style={styles.yLabel}>NUMS OF PURCHASED</Text>
            </View>
            <AreaChart
              className={styles.graph}
              width={width}
              height={height}
              data={manipulateData}
              margin={{
                top: hp(2),
                right: hp(3),
                left: -hp(4),
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
              {top3Products.map(({name}, index) => (
                <Area
                  key={index}
                  type='monotone'
                  opacity={0.65}
                  stroke={LINEGRAPH_COLORS[index]}
                  fill={LINEGRAPH_COLORS[index]}
                  dataKey={name}
                  activeDot={{r: 5}}
                />
              ))}
            </AreaChart>
          </View>
          <View style={styles.lowerPane}>
            <Text style={styles.xLabel}>DAYS OF MONTH</Text>
          </View>
        </View>
      )}
    </View>
  );
}
