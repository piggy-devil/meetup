<template>
  <v-container>
    <v-layout row primary--text>
      <v-flex xs12 sm6 offset-sm3>
        <h2 >เพิ่มรายการในบัญชีซื้อขายพระ</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateAmulet">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="namePra"
                label="ชื่อพระ"
                id="namePra"
                v-model="namePra"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row >
              <v-flex xs12 sm6 offset-sm3>
                <v-textarea
                name="description"
                v-model="description"
                label="รายละเอียด"
                counter
                ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="price"
                label="ราคา"
                id="price"
                v-model="price"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="seller"
                label="ผู้ให้เช่า"
                id="seller"
                v-model="seller"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <!-- <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised color="primary" @click="onPickFile">Upload Image</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked">
            </v-flex>
          </v-layout> -->
          <v-layout row >
            <v-flex xs12 sm6 offset-sm3>
                <image-uploader
                :maxWidth="640"
                :maxHeight="800"
                :quality="0.9"
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
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="linkImg" height="450" ref="namelinkimg">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-date-picker v-model="date" locale="th-TH"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">Create Amulet</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      hasImage: false,
      namePra: '',
      price: '',
      seller: '',
      linkImg: '',
      description: '',
      date: new Date().toISOString().substr(0, 10),
      image: null
    }
  },
  computed: {
    formIsValid () {
      return this.namePra !== ''
        //   this.price !== '' &&
        //   this.linkImg !== '' &&
        //   this.description !== ''
    }
  },
  methods: {
    onCreateAmulet () {
      if (!this.formIsValid) {
        return
      }
      const amuletData = {
        namePra: this.namePra,
        price: this.price,
        seller: this.seller,
        image: this.image,
        description: this.description,
        date: new Date().toUTCString()
      }
      this.$store.dispatch('createAmulet', amuletData)
      this.$router.push('/meetups')
    },
    // onPickFile () {
    //   this.$refs.fileInput.click()
    // },
    setImage (output) {
      this.hasImage = true
      this.image = output
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.linkImg = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
