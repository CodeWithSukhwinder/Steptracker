import { useCallback } from 'react';
import { useUserStore } from '../store/userStore';
import { useStepStore } from '../store/stepStore';
import { BackgroundStepService } from '../sensors/BackgroundStepService';

export const useMultiUser = () => {
  const users = useUserStore((state) => state.users);
  const activeUserId = useUserStore((state) => state.activeUserId);
  const setActiveUserStore = useUserStore((state) => state.setActiveUser);
  const addUserStore = useUserStore((state) => state.addUser);
  const resetSteps = useStepStore((state) => state.reset);

  const switchUser = useCallback((userId: string) => {
    // Stop tracking for current user before switching
    BackgroundStepService.getInstance().stop();
    
    // Switch user context
    setActiveUserStore(userId);
    
    // Reset live counters for the new UI session
    resetSteps();
  }, [setActiveUserStore, resetSteps]);

  const activeUser = users.find((u) => u.id === activeUserId) || null;

  return {
    users,
    activeUser,
    switchUser,
    addUser: addUserStore,
  };
};
