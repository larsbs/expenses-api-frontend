const BASE_URL = 'http://expenses-api.herokuapp.com/api/v1/';


function fetchEntity(entity) {
  const request = new Request(BASE_URL + entity);
  return fetch(request)
    .then(response => response.json())
    .then(json => ({ data: json[entity] }));
}

function latencyFetchEntity(entity) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetchEntity(entity)
      .then(resolve)
      .catch(reject);
    }, 4000);
  });
}

export function fetchExpenses() {
  return fetchEntity('expenses');
}

export function fetchUsers() {
  return latencyFetchEntity('users');
}

export function fetchCategories() {
  return fetchEntity('categories');
}

export function fetchAll() {
  const e = fetchExpenses();
  const u = fetchUsers();
  const c = fetchCategories();
  return Promise.all([e, u, c]);
}
