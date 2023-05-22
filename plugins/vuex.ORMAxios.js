import axios from 'axios'
import VuexORM, { Model } from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'

VuexORM.use(VuexORMAxios, {
    axios,
    baseURL: process.env.BASE_API
})

export default ({ $axios }) => {
    Model.setAxios($axios)
}
