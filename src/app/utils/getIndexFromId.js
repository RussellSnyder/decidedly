export const getIndexFromId = (collection, id) => {
  if (id === undefined || !collection) return -1
  // must be == instead of === because it could be a string or int
  // eslint-disable-next-line eqeqeq
  return collection.findIndex(item => {
    return item.id == id
  })
}