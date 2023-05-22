import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import Item from '../models/Item';

Vue.use(Vuex);

const createStore = () => {
  const database = new VuexORM.Database();
  database.register(Item);

  const store = new Vuex.Store({
    plugins: [VuexORM.install(database)],
    // ...other store configurations
  });

  return store;
};

export const store = createStore();
  
