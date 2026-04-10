import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useStepHistory } from '../hooks/useStepHistory';
import { HistoryChart } from '../components/HistoryChart';
import { dateUtils } from '../utils/dateUtils';

export const HistoryScreen: React.FC = () => {
  const { history, averageSteps, loading } = useStepHistory();

  if (loading && history.length === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Your History</Text>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Last 7 Days Average</Text>
          <Text style={styles.summaryValue}>{averageSteps.toLocaleString()}</Text>
          <Text style={styles.summaryUnit}>steps/day</Text>
        </View>

        <Text style={styles.sectionTitle}>Weekly Trend</Text>
        <HistoryChart data={history} />

        <Text style={styles.sectionTitle}>Daily Breakdown</Text>
        {history.slice().reverse().map((item) => (
          <View key={item.date} style={styles.historyRow}>
            <Text style={styles.rowDate}>{dateUtils.formatDisplayDate(item.date)}</Text>
            <Text style={styles.rowSteps}>{item.steps.toLocaleString()} steps</Text>
          </View>
        ))}
        
        {history.length === 0 && (
          <Text style={styles.emptyText}>No history found yet. Keep walking!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  summaryLabel: {
    color: '#E8F5E9',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  summaryValue: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  summaryUnit: {
    color: '#E8F5E9',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  rowDate: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  rowSteps: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
});
