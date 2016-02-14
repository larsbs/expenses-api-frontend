import moment from 'moment';


export function capitalize(str) {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}


export function getExpensesInRange(expenses, from, to) {
  return expenses.filter(e => {
    return moment(e.created_at) >= from && moment(e.created_at) <= to;
  });
}


export function reverseArray(arr) {
  return arr.slice(0).reverse();
}


export function createFakeId() {
  return Date.now() + Math.floor(Math.random() * 1000000);
}
