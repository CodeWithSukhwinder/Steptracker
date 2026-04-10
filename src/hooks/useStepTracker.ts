import { useEffect, useCallback } from 'react';
import { useStepStore } from '../store/stepStore';
import { useUserStore } from '../store/userStore';
import { BackgroundStepService } from '../sensors/BackgroundStepService';
import { SyncService } from '../services/SyncService';
import { ForegroundService } from '../services/ForegroundService';

export const useStepTracker = () => {
  const isTracking = useStepStore((state) => state.isTracking);
  const toggleTrackingStore = useStepStore((state) => state.toggleTracking);
  const liveCount = useStepStore((state) => state.todayTotal);
  const activeUserId = useUserStore((state) => state.activeUserId);

  useEffect(() => {
    if (isTracking && activeUserId) {
      ForegroundService.start();
      BackgroundStepService.getInstance().start();
    } else {
      BackgroundStepService.getInstance().stop();
      ForegroundService.stop();
    }
  }, [isTracking, activeUserId]);

  useEffect(() => {
    SyncService.reconcile();
  }, [activeUserId]);

  const toggleTracking = useCallback(() => {
    toggleTrackingStore();
  }, [toggleTrackingStore]);

  return {
    isTracking,
    liveCount,
    toggleTracking,
  };
};
