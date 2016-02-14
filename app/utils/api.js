import faker from 'faker';


const BASE_URL = 'http://expenses-api.herokuapp.com/api/v1/';


function fetchEntity(entity) {
  const request = new Request(BASE_URL + entity);
  return fetch(request)
    .then(response => response.json())
    .then(json => json[entity]);
}


function fetchExpenses() {
  return fetchEntity('expenses')
  .then(expenses => {
    const finalExpenses = expenses.map(e => {
      e.created_at = faker.date.past();
      return e;
    })
    .sort((a, b) => {
      if (a.created_at === b.created_at) {
        return 0;
      }
      return a.created_at > b.created_at ? 1 : -1;
    });
    return finalExpenses;
  });
}


function fetchUsers() {
  return fetchEntity('users');
}


function fetchCategories() {
  return fetchEntity('categories');
}


export function fetchAll() {
  const e = fetchExpenses();
  const u = fetchUsers();
  const c = fetchCategories();
  return Promise.all([e, u, c]);
}


export function createUser({ username }) {
  const request = new Request(BASE_URL + 'users' + 'asdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username })
  });
  //return fetch(request)
    //.then(response => response.json())
    //.then(json => json[entity]);
  return new Promise(resolve => {
    setTimeout(resolve.bind(undefined, { user: null, err: true }), 5000);
  });
}
