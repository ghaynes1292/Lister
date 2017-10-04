import localforage from 'localforage';

const LISTS = 'LISTS';
const LIST_ITEMS = 'LIST_ITEMS';

const configStorage = () => {
  localforage.config({
    name        : 'list-db',
    version     : 1.0,
    storeName   : 'lists',
    description : 'Lists'
  })
}
configStorage();

const getLists = () => localforage.getItem(LISTS);
const saveLists = lists => localforage.setItem(LISTS, lists);

const getListItems = () => localforage.getItem(LIST_ITEMS);
const saveListItems = listItems => localforage.setItem(LIST_ITEMS, listItems);

export { getLists, saveLists, getListItems, saveListItems }
