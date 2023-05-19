import { Model } from '@vuex-orm/core'

export default class Game extends Model {
  static entity = 'games'

  static fields () {
    return {
      id: this.attr(null),
      title: this.string(''),
      thumbnail: this.attr(null),
      short_description: this.string(''),
      genre: this.string(''),
      platform: this.string(''),
      publisher: this.string(''),
      developer: this.string(''),
      //release_date: this.attr(null),
    }
  }
}