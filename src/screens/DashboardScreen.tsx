import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useStepTracker } from '../hooks/useStepTracker';
import { useMultiUser } from '../hooks/useMultiUser';
import { StepRing } from '../components/StepRing';

type RootStackParamList = {
  Dashboard: undefined;
  History: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

interface Props {
  navigation: NavigationProp;
}

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { isTracking, liveCount, toggleTracking } = useStepTracker();
  const { activeUser, switchUser } = useMultiUser();

  const handleSwitchUser = () => {
    switchUser(''); // Clear active user to trigger redirect to UserSelect
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hello,</Text>
          <Text style={styles.userName}>{activeUser?.name || 'User'}</Text>
        </View>
        <TouchableOpacity style={styles.switchButton} onPress={handleSwitchUser}>
          <Text style={styles.switchButtonText}>Switch</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <StepRing steps={liveCount} goal={10000} />
        
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{liveCount}</Text>
            <Text style={styles.statLabel}>Steps Today</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {Math.max(0, 10000 - liveCount)}
            </Text>
            <Text style={styles.statLabel}>To Goal</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.trackButton,
            isTracking ? styles.stopButton : styles.startButton,
          ]}
          onPress={toggleTracking}
        >
          <Text style={styles.trackButtonText}>
            {isTracking ? 'Pause Tracking' : 'Start Tracking'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate('History')}
      >
        <Text style={styles.historyButtonText}>View History</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  switchButton: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  switchButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 40,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#EEE',
  },
  trackButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 30,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  trackButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyButton: {
    padding: 20,
    alignItems: 'center',
  },
  historyButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
});
