export function validateUsername(username) {
  if ( ! username || username === '') {
    return {
      error: 'The username must not be empty'
    };
  }
  return {
    username
  };
}


export function validateCategoryName(name) {
  if ( ! name || name === '') {
    return {
      error: 'The name must not be empty'
    };
  }
  return {
    name
  };
}
