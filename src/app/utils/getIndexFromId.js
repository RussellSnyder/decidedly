export const getIndexFromId = (collection, id) => {
  if (id === undefined || !collection) return -1
  // must be == instead of === because it could be a string or int
  return collection.findIndex(item => {
    // eslint-disable-next-line eqeqeq
    return item.id == id
  })
}