
export const DEVICE_COUNT_RANGES = [
  { value: 'All', label: 'All' },
  { value: '0', label: 'No devices' },
  { value: '1-2', label: '1-2 devices' },
  { value: '3-4', label: '3-4 devices' },
  { value: '5-10', label: '5-10 devices' },
  { value: '10+', label: '10+ devices' }
] as const;

export const isDeviceCountInRange = (deviceCount: number, range: string): boolean => {
  switch (range) {
    case '0':
      return deviceCount === 0;
    case '1-2':
      return deviceCount >= 1 && deviceCount <= 2;
    case '3-4':
      return deviceCount >= 3 && deviceCount <= 4;
    case '5-10':
      return deviceCount >= 5 && deviceCount <= 10;
    case '10+':
      return deviceCount > 10;
    default:
      return true;
  }
};

export const normalizeStringValue = (value: string) => {
  return value.toLowerCase().replace(/\s/g, '').trim();
}
