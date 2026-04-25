import { getAllItems, getItemsByStatus, getItemById, createItem, deleteItem } from './data';

export const getAllItemsAPI = async () => {
  return getAllItems();
};

export const getItemsByStatusAPI = async (status) => {
  return getItemsByStatus(status);
};

export const getItemByIdAPI = async (id) => {
  return getItemById(id);
};

export const createItemAPI = async (itemData) => {
  return createItem(itemData);
};

export const deleteItemAPI = async (id) => {
  return deleteItem(id);
};