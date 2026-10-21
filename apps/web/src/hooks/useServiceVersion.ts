import { useSyncExternalStore } from 'react';
import { services } from '@/services/registry';
export function useServiceVersion() {
  return useSyncExternalStore(services.subscribe, services.getVersion, services.getVersion);
}
