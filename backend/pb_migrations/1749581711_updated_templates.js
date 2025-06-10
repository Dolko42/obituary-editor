/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_184785686")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id = \"0jnz3a259c6vddy\"",
    "deleteRule": "@request.auth.id = \"0jnz3a259c6vddy\"",
    "listRule": "",
    "updateRule": "@request.auth.id = \"0jnz3a259c6vddy\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_184785686")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "updateRule": null
  }, collection)

  return app.save(collection)
})
