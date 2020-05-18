export const getHighestId = (collection) => {
  if (!collection) return 0;
  const collectionIds = Object.keys(collection);
  if(collectionIds.length < 1) { return 1; }
  return Math.max( ...collectionIds.map(id => parseInt(id)))
}