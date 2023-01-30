<script>
export default {
    name: 'SignIn',
    data() {
        return {
            name: "",
            email: "",
            password: "",
            passwordConfirm: ""
        }
    },
    methods: {
        trySignIn() {
            this.$emit('signIn', {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.passwordConfirm
            })
        },
    },
    emits: {
        signIn: ({ name, email, password, password_confirmation }) => {
            console.log(name, email, password, password_confirmation)
            if (!name) {
                console.log("brak nazwy")
                return false
            }
            if (!email) {
                console.log("brak maila")
                return false
            }
            if (!password) {
                console.log("brak hasła")
                return false
            }
            if (!password_confirmation) {
                console.log("brak potwierdzenia hasła")
                return false
            }
            return true
        },
        gotologin: null,
        close: null,
    }
}
</script>

<template>
<div class="modal-bg">
    <div class="modal">
        <div class="sign-in">
            <div class="inputs">
                <div class="field">
                    <label>Username</label>
                    <input type="text" v-model="this.name">
                </div>
                <div class="field">
                    <label>Email</label>
                    <input type="text" v-model="this.email">
                </div>
                <div class="field">
                    <label>Password</label>
                    <input type="password" v-model="this.password">
                </div>
                <div class="field">
                    <label>Confirm Password</label>
                    <input type="password" v-model="this.passwordConfirm">
                </div>
            </div>
            <button @click="trySignIn">Sign In</button>
            <div class="other">
                <button class="close" @click="$emit('gotologin')">Already have an account? <br/>Log in here!</button>
                <button class="close" @click="$emit('close')">Go back</button>
            </div>
        </div>
    </div>
</div>

</template>

<style scoped>

.sign-in {
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