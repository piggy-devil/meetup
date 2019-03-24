<template>
  <v-container >
    <v-layout row >
      <v-flex >
        <image-uploader
        :preview="true"
        :className="['fileinput', { 'fileinput--loaded': hasImage }]"
        capture="environment"
        :debug="1"
        doNotResize="gif"
        :autoRotate="true"
        outputFormat="verbose"
        @input="setImage"
      >
        <label for="fileInput" slot="upload-label">
          <v-icon
            class="primary--text"
            style="cursor: pointer"
            large>{{ hasImage ? 'photo' : 'add_a_photo' }}
          </v-icon>
        </label>
      </image-uploader>
      </v-flex>
    </v-layout>
    <v-layout row >
      <v-flex >
        <v-btn color="#4267b2" dark @click="loginFaceBook" >Log in with Facebook</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row >
      <v-flex >
        <v-btn outline color="info" dark @click="logoutFaceBook">Logout</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row >
      <v-flex >
        <v-btn outline color="red" dark @click="getUser">get user</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as firebase from 'firebase'

export default {
  name: "UploadImage",
  data() {
    return {
      hasImage: false,
      image: null
    };
  },
  methods: {
    setImage: function(output) {
      this.hasImage = true;
      this.image = output;
      console.log(this.image);
    },
    loginFaceBook: () => {
      let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(function (result) {
          let token = result.credential.accessToken
          let user = result.user
          console.log(token)
          console.log(user)
        }).catch(function(error) {
          console.log(error.code)
          console.log(error.message)
        })
    },
    logoutFaceBook: () => {
      firebase.auth().signOut()
      .then(function() {
        console.log('Signout successful!')
      }).catch(function(error) {
        console.log(error)
      })
    },
    getUser () {
      // firebase.auth().onAuthStateChanged()
      // .then(function(user){
      //   console.log(user)
      // })
      // .catch(function (e) {
      //   console.log(e)
      // })
      let user = firebase.auth().currentUser
      console.log('user', user)
      // console.log('user', user.providerData[0].photoURL)
      console.log('user', this.$store.getters.userFaceBook)
    },
  }
};
</script>
<style>
#fileInput {
  display: none;
}

.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}

</style>
