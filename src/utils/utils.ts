export const getNextId = ((): (() => string) => {
  let id: number = 0;
  return (): string => `id_${Date.now()}_${id++}`;
})();
