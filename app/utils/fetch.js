const BASE_URL = 'http://expenses-api.herokuapp.com/api/v1/';


export function fetchExpenses() {
}

export function fetchUsers() {
  const request = new Request(BASE_URL + 'users');
  return fetch(request)
  .then(response => {
    return response.json();
  })
  .then(json => json.users);
}

export function fetchCategories() {
}
