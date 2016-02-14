import faker from 'faker';
import pluralize from 'pluralize';


//const BASE_URL = '//expenses-api.herokuapp.com/api/v1/';
const BASE_URL = '//localhost:4000/api/v1/';


function fetchEntity(entity) {
  const request = new Request(BASE_URL + entity);
  return fetch(request)
    .then(response => response.json())
    .then(json => json[entity] );
}


function createEntity(entity, properties) {
  const request = new Request(BASE_URL + pluralize(entity), {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(properties)
  });
  return fetch(request)
    .then(response => response.json())
    .then(json => json[entity] );
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
  return createEntity('user', { username });
}


export function createCategory({ name }) {
  return createEntity('category', { name });
}


export function createExpense({ note, amount, category_id, user_id }) {
  return createEntity('expense', { note, amount, category_id, user_id });
}
