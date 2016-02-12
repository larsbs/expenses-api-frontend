export const LOAD_APP = 'LOAD_APP';

export function loadApp() {
  return {
    type: LOAD_APP
  };
}


export const SHOW_LOADING = 'SHOW_LOADING';

export function showLoading() {
  return {
    type: SHOW_LOADING
  };
}


export const FINISH_LOADING = 'FINISH_LOADING';

export function finishLoading() {
  return {
    type: FINISH_LOADING
  };
}
