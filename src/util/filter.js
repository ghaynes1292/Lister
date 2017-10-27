import moment from 'moment'

export const ADDED = 'createdAt';
export const WATCHED = 'attributes.watchDate';
export const TITLE = 'attributes.Title';
export const RELEASE = 'attributes.Released';

export const ASCENDING = 'ASCENDING';
export const DESCENDING = 'DESCENDING';

export const getSortable = (type, obj) => type !== TITLE ? moment(obj) : obj
