import { getHighestId } from './getHighestId';

export const getNextId = (collection) => getHighestId(collection) + 1