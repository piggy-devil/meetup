import * as firebase from 'firebase'

export default {
  state: {
    loadedAmulets: [{
      id: 'afsadfsdf',
      creatorId: 'sfsfesfsasefsef',
      namePra: 'ชื่อพระหลวงพ่อปลอด',
      nameModel: 'ชื่อรุ่น',
      nameYear: 'ปีที่สร้าง',
      nameTemple: 'ชื่อวัด',
      subDistrict: 'ตำบล',
      district: 'อำเภอ',
      province: 'จังหวัด',
      category: 'ประเภทพระเครื่อง',
      widthPra: 'ขนาดตามความกว้าง(cm)',
      height: 'ขนาดตามความสูง(cm)',
      linkImg: 'https://firebasestorage.googleapis.com/v0/b/vuejs-f29e2.appspot.com/o/amulets%2F-LaQs9DsvuCKvw6UjTC7?alt=media&token=8ac3344d-2229-4724-8a97-e5a4916c6b7e',
      description: 'หลวงพ่อปลอดวัดหัวป่า เป็นเกจิที่เข็มขลังและศักดิ์สิทธ์มากๆ  ....วัตถุมงคลของท่านพุทธคุณสุดีทุกๆๆด้านครับ',
      date: '2017-07-18',
      price: '3000',
      seller: 'วิจิตร ช่อมณี'
    }, {
      id: 'kjtutrhtfhr',
      creatorId: 'sfsfesfsasefsef',
      namePra: 'ชื่อพระหลวงพ่อปาล',
      nameModel: 'ชื่อรุ่น',
      nameYear: 'ปีที่สร้าง',
      nameTemple: 'ชื่อวัด',
      subDistrict: 'ตำบล',
      district: 'อำเภอ',
      province: 'จังหวัด',
      category: 'ประเภทพระเครื่อง',
      widthPra: 'ขนาดตามความกว้าง(cm)',
      height: 'ขนาดตามความสูง(cm)',
      linkImg: 'https://firebasestorage.googleapis.com/v0/b/vuejs-f29e2.appspot.com/o/amulets%2F-LaQxXyT2hUzWkoGoXYU.png?alt=media&token=8d21fe71-6612-49c2-bc0f-4c7a20d1e648',
      description: 'หลวงพ่อปาล วัดเขาอ้อ เป็นเกจิที่เข็มขลังและศักดิ์สิทธ์มากๆ   ...วัตถุมงคลของท่านพุทธคุณสุดีทุกๆๆด้านครับ',
      date: '2017-07-18',
      price: '10000',
      seller: 'แอด เลน้อย'
    }]
  },
  mutations: {
    createAmulet (state, payload) {
      state.loadedAmulets.push(payload)
    }
  },
  actions: {
    createAmulet ({
      commit,
      getters
    }, payload) {
      const amulet = {
        namePra: payload.namePra,
        price: payload.price,
        seller: payload.seller,
        description: payload.description,
        date: payload.date,
        creatorId: getters.user.id
      }
      let linkImg
      let key
      firebase.database().ref('amulets').push(amulet)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          let storageRef = firebase.storage().ref()
          let path = '/amulets/' + key + ext
          let img = payload.image.dataUrl.split(/,(.+)/)[1]
          var iRef = storageRef.child(path)

          return iRef.putString(img, 'base64', {
            contentType: payload.image.type
          })
        })
        .then(fileData => {
          return firebase.storage().ref(fileData.metadata.fullPath).getDownloadURL()
        })
        .then(url => {
          return firebase.database().ref('amulets').child(key).update({
            linkImg: url
          })
        })
        .then(() => {
          commit('createAmulet', {
            ...amulet,
            linkImg: linkImg,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    }
  },
  getters: {
    loadedAmulets (state) {
      return state.loadedAmulets.sort((A, B) => {
        return A.date > B.date
      })
    }
  }
}
