<script setup>
import Kanji from './components/Kanji.vue'
import Login from './components/Login.vue'
import SignIn from './components/SignIn.vue'
import Create from './components/Create.vue'
</script>

<script>
export default {
  data() {
    return {
      user: undefined,
      kanjis: [],
      isLoginModalOpen: false,
      isSignInModalOpen: false,
      isCreateModalOpen: false,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      await this.axios.get('http://127.0.0.1:8000/api/kanji').then((res) => {
        this.kanjis = res.data
        this.kanjis = this.kanjis.reverse()
      })
    },
    async signIn(credentials) {
      const config = {
          headers: {
              Accept: "application/json"
          }
      }
      await this.axios.post('http://127.0.0.1:8000/api/register', credentials, config).then((res) => {
        this.user = res.data.user
          this.$cookies.set('token', res.data.token)
      })
      this.isSignInModalOpen = false
    },
    async login(credentials) {
      const config = {
          headers: {
              Accept: "application/json"
          }
      }
      await this.axios.post('http://127.0.0.1:8000/api/login', credentials, config).then((res) => {
        this.user = res.data.user
          this.$cookies.set('token', res.data.token)
      })
      this.isLoginModalOpen = false
    },
    async logout() {
      const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.$cookies.get('token')}`
          }
      }
      await this.axios.post('http://127.0.0.1:8000/api/logout', {}, config).then(() => {
        this.$cookies.remove('token')
        this.user = undefined
      })
    },
    showSignIn() {
      this.isLoginModalOpen = false
      this.isSignInModalOpen = true
    },
    showLogIn() {
      this.isSignInModalOpen = false
      this.isLoginModalOpen = true
    },
    closeModals() {
      this.isSignInModalOpen = false
      this.isLoginModalOpen = false
      this.isCreateModalOpen = false
    },
    async createKanji(newKanji) {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.$cookies.get('token')}`
        }
      }
      await this.axios.post(`http://127.0.0.1:8000/api/kanji`, newKanji, config).then((res) => {
        this.getList()
        this.isCreateModalOpen = false
      })
    },
    async updateKanji(newKanji, id) {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.$cookies.get('token')}`
        }
      }
      await this.axios.put(`http://127.0.0.1:8000/api/kanji/${id}`, newKanji, config).then((res) => {
        this.getList()
      })
    },
    async deleteKanji(id) {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.$cookies.get('token')}`
        }
      }
      await this.axios.delete(`http://127.0.0.1:8000/api/kanji/${id}`, config).then((res) => {
        this.getList()
      })
    }
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="100" height="100" />
    <div v-if="user" class="username">{{ user.name }}</div>
    <div class="control">
      <button
        v-if="user"
        @click="isCreateModalOpen = true"
        >Add new kanji</button>
      <button v-if="user" @click="logout">Logout</button>
      <div v-else>
        <button @click="isLoginModalOpen = true">Log In</button>
        <button @click="isSignInModalOpen = true">Sign In</button>
      </div>
    </div>
  </header>

  <main>
    <Teleport to="#modal">
      <Login v-if="isLoginModalOpen" @login="login" @gotosignin="showSignIn" @close="closeModals"/>
      <SignIn v-if="isSignInModalOpen" @sign-in="signIn" @gotologin="showLogIn" @close="closeModals"/>
      <Create v-if="isCreateModalOpen" @create="createKanji" @close="closeModals"/>
    </Teleport>
    <Kanji
      v-for="kanji in kanjis"
      :info="kanji"
      :isLoggedIn="this.user != undefined"
      @delete="deleteKanji"
      @modify="updateKanji"/>
  </main>

  <footer>
    <div class="authors">
      Mateusz Skop | Jakub Lebioda
    </div>
    <div class="date">31 January 2023 - 2 0 2 3 年 1 月 31 日</div>
  </footer>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
}

.username {
  color: #42b883;
  font-size: 4rem;
  align-self: center;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
  Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  padding-left: 3rem;
}

.control {
  margin-left: auto;
  align-self: center;
  margin-right: 2rem;
}

button {
  margin-left: 1rem;
}

.logo {
  padding: 1rem;
}
</style>

<style>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;

  background-color: #181818;
  padding: 1rem 2rem;
  border: solid 2px #42b883;

  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
  Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  color: #42b883;
  font-size: 1.3rem;
}

button {
  border: none;
  outline: none;
  background-color: #42b883;
  padding: 0.8rem;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
  Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.5rem;
}

button:hover {
  background-color: #308d63;
}

footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  color: #42b883;
  font-size: 2rem;
  align-self: center;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
  Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.authors {
  justify-self: center;
}
</style>
