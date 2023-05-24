/* export const state = () => ({
  userData: null,
});

export const mutations = {
  setUserData(state, data) {
    state.userData = data;
  },
};

export const actions = {
  setUserData({ commit }, data) {
    commit('setUserData', data);
  },
}; */

/* 
import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import Item from '../database/models/Item';
import { Database } from "@vuex-orm/core";

Vue.use(Vuex); 

const database = new Database()
database.register(Item);
export default database


const createStore = () => {
  const database = new VuexORM.Database();
  database.register(Item);

  const store = new Vuex.Store({
    plugins: [VuexORM.install(database)],
  });

  return store;
};

export const store = createStore(); */
  
