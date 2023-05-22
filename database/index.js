import { Database } from "@vuex-orm/core"
import * as Models from "./models"

const database = new Database()

database.register(Models.Item)

export default database