export function capitalize(str) {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}


export function getExpensesInRange(expenses, from, to) {
  return expenses.slice(0, 10);  // TODO: Use real date range
}


export function reverseArray(arr) {
  return arr.slice(0).reverse();
}


export function createFakeId() {
  return Date.now() + Math.floor(Math.random() * 1000000);
}
