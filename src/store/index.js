import Vue from 'vue'
import Vuex from 'vuex'

import meetup from './meetup'
import user from './user'
import shared from './shared'
import amulet from './amulet'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    meetup: meetup,
    user: user,
    shared: shared,
    amulet: amulet
  }
})
