import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import { dateUtils } from '../utils/dateUtils';

interface HistoryChartProps {
  data: { date: string; steps: number }[];
}

const screenWidth = Dimensions.get('window').width;

export const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  const chartData = data.map((d) => ({
    x: dateUtils.getShortDay(d.date),
    y: d.steps,
  }));

  return (
    <View style={styles.container}>
      <VictoryChart
        theme={VictoryTheme.material}
        width={screenWidth - 40}
        height={250}
        padding={{ top: 20, bottom: 40, left: 50, right: 30 }}
        domainPadding={{ x: 20 }}
      >
        <VictoryAxis
          tickFormat={(x) => x}
          style={{
            tickLabels: { fontSize: 10, padding: 5 },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(y) => (y >= 1000 ? `${y / 1000}k` : y)}
          style={{
            tickLabels: { fontSize: 10, padding: 5 },
          }}
        />
        <VictoryBar
          data={chartData}
          style={{
            data: { fill: '#4CAF50', width: 25 },
          }}
          cornerRadius={{ top: 5 }}
          animate={{
            duration: 1000,
            onLoad: { duration: 500 },
          }}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 16,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
