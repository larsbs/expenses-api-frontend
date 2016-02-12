export const LOAD_APP = Symbol.for('LOAD_APP');

export function loadApp() {
  return {
    type: LOAD_APP
  };
}
