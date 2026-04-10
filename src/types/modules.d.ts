declare module '@supersami/rn-foreground-service' {
  interface ForegroundServiceOptions {
    id: number;
    title: string;
    message: string;
    icon: string;
    button?: boolean;
    buttonText?: string;
    buttonOnPress?: string;
    mainComponent?: string;
  }

  const ReactNativeForegroundService: {
    register: () => void;
    start: (options: ForegroundServiceOptions) => Promise<void>;
    stop: () => Promise<void>;
    update: (options: ForegroundServiceOptions) => void;
    is_foregroundService_running: () => boolean;
  };

  export default ReactNativeForegroundService;
}

declare module 'victory-native' {
  export * from 'victory';
}
