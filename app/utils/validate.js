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
