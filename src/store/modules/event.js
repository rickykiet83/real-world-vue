import EventService from '@/services/EventService.js'
export const namespaced = true

export const state = {
  events: [],
  event: {},
  eventsTotal: 0
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  createEvent({ commit, rootState }, event) {
    console.log('User creating Event is ' + rootState.user.user.name)

    return EventService.postEvent(event).then(() => commit('ADD_EVENT', event))
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
        commit('SET_EVENTS_TOTAL', +response.headers['x-total-count'])
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  }
}

export const getters = {
  // catLength: state => state.categories.length,
  // doneTodos: state => state.todos.filter(todo => todo.done),
  // activeTodosCount: state => state.todos.filter(todo => !todo.done).length,
  getEventById: state => id => state.events.find(event => event.id === id)
}
