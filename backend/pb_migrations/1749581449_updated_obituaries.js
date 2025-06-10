/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_818611394")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != null",
    "deleteRule": "@request.auth.id = @collection.users.id",
    "updateRule": "@request.auth.id = @collection.users.id",
    "viewRule": "@request.auth.id = @collection.users.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_818611394")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "",
    "updateRule": "",
    "viewRule": ""
  }, collection)

  return app.save(collection)
})
