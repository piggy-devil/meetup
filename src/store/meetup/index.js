import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: [{
      linkImg: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
      id: 'afsadfsdf',
      title: 'aaaaaaa',
      date: '2017-07-18',
      location: 'New York',
      description: 'New York 1111111111111111'
    }, {
      linkImg: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
      id: 'asfsfsd',
      title: 'bbbbbbb',
      date: '2017-07-16',
      location: 'New York',
      description: 'New York 1111111111111111'
    }, {
      linkImg: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
      id: 'asfsdfsd',
      title: 'ccccc',
      date: '2017-07-19',
      location: 'New York',
      description: 'New York 1111111111111111'
    }, {
      linkImg: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
      id: 'retgsafsfae',
      title: 'ddddd',
      date: '2017-07-14',
      location: 'New York',
      description: 'New York 1111111111111111'
    }]
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    }
  },
  actions: {
    loadMeetups ({
      commit
    }) {
      commit('setLoading', false)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              description: obj[key].description,
              linkImg: obj[key].linkImg,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createMeetup ({
      commit,
      getters
    }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        // linkImg: payload.linkImg,
        description: payload.description,
        date: payload.date,
        creatorId: getters.user.id
      }
      let linkImg
      let key
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + ext).put(payload.image)
        })
        .then(fileData => {
          return firebase.storage().ref(fileData.metadata.fullPath).getDownloadURL()
        })
        .then(url => {
          return firebase.database().ref('meetups').child(key).update({
            linkImg: url
          })
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            linkImg: linkImg,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    updateMeetupData ({
      commit
    }, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
}
