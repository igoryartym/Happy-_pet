import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, push, onValue, update } from "firebase/database";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [],
        user: null,
        loading: false,
        error: null
    },
    getters: {
        getMeetups: ({ loadedMeetups }) => {
            return userInput => {
                if (userInput.length === 0) {
                    return loadedMeetups
                } else {
                    return loadedMeetups.filter(el => el.title.toLowerCase().includes(userInput.toLowerCase()))
                }
            }
        },
        getRecentEvents: ({ loadedMeetups }) => {
            loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date;
            })
            return loadedMeetups.slice(0, 8)

        },
        getMeetupById: ({ loadedMeetups }) => {
            return id => {
                return loadedMeetups.find(meetup => meetup.id === id)
            }
        },
        user(state) {
            return state.user
        },
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        }
    },
    mutations: {
        setLoadedMeetups(state, payload) {
            state.loadedMeetups = payload
        },
        addMeetup(state, payload) {
            state.loadedMeetups.push(payload)
        },
        updateMeetup(state, payload) {
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
        },
        setUser(state, payload) {
            state.user = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        loadMeetups({ commit }) {
            const db = getDatabase();
            onValue(ref(db, 'meetups'), (data) => {
                let meetups = []
                const obj = data.val();
                for (let key in obj) {
                    meetups.push({
                        id: obj[key].id,
                        title: obj[key].title,
                        topic: obj[key].topic,
                        description: obj[key].description,
                        imageUrl: obj[key].imageUrl,
                        date: obj[key].date,
                        time: obj[key].time,
                        creatorId: obj[key].creatorId,
                    })
                }
                commit('setLoadedMeetups', meetups)
            })
        },
        addMeetupAction({ commit, getters }, payload) {
            const db = getDatabase();
            const meetup = {
                title: payload.title,
                topic: payload.topic,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                time: payload.time,
                id: payload.id,
                creatorId: getters.user.id
            }
            let key
            push(ref(db, 'meetups'), meetup)
                .then(data => {
                    key = data.key
                    commit('addMeetup', { ...meetup, meetupKey: key })
                    console.log(data, 'successfully added')
                    console.log('key = ', key)
                })
                .catch(err => {
                    console.log(err, 'error')
                })

        },
        updateMeetupData({ commit }, payload) {
            const db = getDatabase()
            const dbRef = ref(db, `meetups/-MycM75ajsvgGRYyMfGw`)
            update(dbRef, { title: "HELLO" })
                .then(() => {
                    commit('updateMeetup', payload)
                    console.log("Data updated");
                }).catch((e) => {
                    console.log(e);
                })

        },
        signUserUp({ commit }, payload) {
            const auth = getAuth();
            commit('setLoading', true)
            commit('clearError')
            createUserWithEmailAndPassword(auth, payload.email, payload.password)
                .then((userCredential) => {
                    const user = {
                        id: '1',
                        registeredMeetups: []
                    }
                    commit('setUser', user)
                    console.log(user, userCredential)
                })
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    });
        },
        signUserIn({ commit }, payload) {
            commit('setLoading', true)
            commit('clearError')
            const auth = getAuth();
            signInWithEmailAndPassword(auth, payload.email, payload.password)
                .then((userCredential) => {
                    commit('setLoading', false)
                    //const user = userCredential.user;
                    let user = {
                        id: 1,
                        registeredMeetups: []
                    }
                    commit('setUser', user)
                    console.log(user, userCredential)
                })
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    });
        },
        autoSignIn({ commit }, payload) {
            commit('setUser', { id: payload.uid, registeredMeetups: [] })
        },
        logout({ commit }) {
            const auth = getAuth();
            signOut(auth).then(() => {
                commit('setUser', null)
            }).catch((error) => {
                console.log(error)
            });
        },
        clearError({ commit }) {
            commit('clearError')
        }
    }
})