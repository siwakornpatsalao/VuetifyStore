import { Model } from "@vuex-orm/core";

export default class Item extends Model{
    
    static entity = 'items' 

    static fields(){
        return{
            id: this.attr(null),
            title: this.attr(''),
            genre: this.attr(''),
            thumbnail: this.attr(''),
            platform: this.attr(''),
            game_url: this.attr(''),
            publisher: this.attr(''),
            developer: this.attr(''),
            short_description: this.attr(''),
            release_date: this.attr(''),
        }
    }
}