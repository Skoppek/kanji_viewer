<script>
export default {
    name: 'Login',
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        tryLogin() {
            this.$emit('login', {
                email: this.email,
                password: this.password
            })
        }
    },
    emits: {
        login: ({ email, password }) => {
            if (!email) {
                console.log("brak maila")
                return false
            }
            if (!password) {
                console.log("brak hasła")
                return false
            }
            return true
        },
        gotosignin: null,
        close: null
    }
}
</script>

<template>
<div class="modal-bg">
    <div class="modal">
        <div class="login">
            <div class="inputs">
                <div class="field">
                    <label>Email</label>
                    <input type="text" v-model="this.email">
                </div>
                <div class="field">
                    <label>Password</label>
                    <input type="password" v-model="this.password">
                </div>
            </div>
            <button @click="tryLogin">Log in</button>
            <div class="other">
                <button class="close" @click="$emit('gotosignin')">No account? Sign in here!</button>
                <button class="close" @click="$emit('close')">Go back</button>
            </div>
        </div>
    </div>
</div>

</template>

<style scoped>

.login {
    display: flex;
    flex-direction: column;
}

.field {
    display: flex;
    flex-direction: column;
}

input {
    font-size: 1.5rem;
    border: none;
    outline: none;
    background-color: #292929;
    color: #66e4ab;
    padding: 10px;
}

label {
    margin: 0.5rem 0;
}

button {
    margin-top: 1rem;
}

.other {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.close {
    font-size: 1rem;
    color: #66e4ab;
    background-color: #181818;
    padding: 0;
}
</style>