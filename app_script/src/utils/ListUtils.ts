export function _uniqueValues<T, E>(array: T[], callbackFn: (value: T, index: number, array: T[]) => E): Set<E> {

  function reduceFn(previousValue: Set<E>, currentValue: T, currentIndex: number, array: T[]): Set<E> {
    const value = callbackFn(currentValue, currentIndex, array);
    previousValue.add(value);
    return previousValue;
  }

  return array.reduce(reduceFn, new Set<E>());
}

export function _keyBy<T, K>(array: T[], callbackFn: (value: T, index: number, array: T[]) => K): Map<K, T> {
  return new Map<K, T>(array.map((value, index, array) => [callbackFn(value, index, array), value]));
}