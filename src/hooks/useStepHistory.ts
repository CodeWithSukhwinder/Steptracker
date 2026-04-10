import { useState, useEffect, useCallback } from 'react';
import { useUserStore } from '../store/userStore';
import { StepRepository } from '../database/repositories/StepRepository';

interface DailyData {
  date: string;
  steps: number;
}

export const useStepHistory = () => {
  const activeUserId = useUserStore((state) => state.activeUserId);
  const [history, setHistory] = useState<DailyData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (!activeUserId) return;
    setLoading(true);
    try {
      const summaries = await StepRepository.getHistory(activeUserId);
      const data = summaries.map((s) => ({
        date: s.dateKey,
        steps: s.totalSteps,
      }));
      setHistory(data.reverse()); // Chronological for chart
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  }, [activeUserId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const averageSteps = history.length > 0
    ? Math.round(history.reduce((sum, d) => sum + d.steps, 0) / history.length)
    : 0;

  return {
    history,
    averageSteps,
    loading,
    refreshHistory: fetchHistory,
  };
};
