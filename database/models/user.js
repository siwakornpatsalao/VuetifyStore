import { Model } from "@vuex-orm/core";

export default class User extends Model{
    
    static entity = 'users' 

    static fields(){
        return{
            id: this.uid(),
            username: this.attr(''),
            gmail: this.attr(''),
            password: this.attr(''),
            name: this.attr(''),
            surname: this.attr(''),
            city: this.attr(''),
            ageCal: this.attr(''),
        }
    }

    static insert({ data }) {
        return this.insertOrUpdate({ data });
      }
}