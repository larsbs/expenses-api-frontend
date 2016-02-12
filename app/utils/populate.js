export function populateHasMany(key, dest, entities, entityKey) {
  dest[key] = entities
  .filter(e => e[entityKey] === dest.id)
  .map(e => {
    e[entityKey] = dest;
    return e;
  });
  return dest;
}

export function populateBelongsTo(key, dest, entities, searchKey) {
  dest[key] = entities.filter(e => e.id === dest[searchKey])[0];
  return dest;
}
