import _zipObject from 'lodash/zipObject';

export const enumerable = (...items) => _zipObject(items, items);

export const createAction = (type, payload) => ({ type, payload });
