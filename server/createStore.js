module.exports = () => {
  const store = [];

  return {
    add: element => {
      store.push(element)
      return element
    },
    get: id => store.find(e => e.getId() === id),
    remove: id => store.filter(e => e.getId() !== id),
    update: element => store.map(e => (
      e.getId() === element.getId() ? element : e
    ))
  }
}
