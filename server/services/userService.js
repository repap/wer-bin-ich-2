const createUserModel = require('../models/userModel')

module.exports = ({ users }) => socket => {
  return {
    setName: ({ id, name }) => users.get(id).setName(name),
    setAlias: ({ id, alias }) => users.get(id).setAlias(alias),
    create: () => users.add(createUserModel(socket)),
  }
}