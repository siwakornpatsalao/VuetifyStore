import VuexORM from '@vuex-orm/core'
import database from '@/database'
import VuexORMAxios from '@vuex-orm/plugin-axios'

VuexORM.use(VuexORMAxios)

export default ({ store }) => {
  VuexORM.install(database, { namespace: 'models' })(store)
}