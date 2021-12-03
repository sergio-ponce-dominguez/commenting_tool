export type WithId = { id: string };
export type ById<T extends WithId> = { [id: string]: T | undefined };

export const mapById = <T extends WithId>(array: T[]): ById<T> =>
  array.reduce((result, item) => ({ ...result, [item.id]: item }), {} as ById<T>);

export const fromByIdToList = <T extends WithId>(map: ById<T>): T[] =>
  Object.values(map).filter((element) => element !== undefined) as T[];
