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


export function validateExpenseNote(note) {
  if ( ! note || note === '') {
    return {
      error: 'The note must not be empty'
    };
  }
  return {
    note
  };
}


export function validateExpenseAmount(amount) {
  amount = Number(amount);
  if ( ! amount || isNaN(amount)) {
    return {
      error: 'Please, insert a valid amount'
    };
  }
  return {
    amount
  };
}
