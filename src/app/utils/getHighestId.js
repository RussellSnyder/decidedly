export const getHighestId = (collection) => {
  if (!collection || collection.length < 1) { return 0; }
  return parseInt(Math.max( ...collection.map(item => item.id)))
}