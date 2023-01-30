<script>
export default {
    name: 'Create',
    data() {
        return {
            kanji: "",
            onyomi: "",
            kunyomi: "",
            meanings: ""
        }
    },
    emits: [
        'close',
        'create'
]
}
</script>

<template>
<div class="modal-bg">
    <div class="modal">
        <div class="modify">
            <div class="kanji info">
                <label>Kanji</label>
                <input type="text" v-model="this.kanji">
            </div>
            <div class="infos">
                <div class="horizontal">
                    <div class="info">
                        <label>On-yomi</label>
                        <input type="text" v-model="this.onyomi">
                    </div>
                    <div class="info">
                        <label>Kun-yomi</label>
                        <input type="text" v-model="this.kunyomi">
                    </div>
                </div>
                <div class="info full">
                    <label>Meanings</label>
                    <input type="text" v-model="this.meanings">
                </div>
            </div>
        </div>
        <div class="controls horizontal">
            <button @click="$emit('create', ({
                kanji: this.kanji,
                onyomi: this.onyomi,
                kunyomi: this.kunyomi,
                meanings: this.meanings
            }))">CREATE</button>
            <button class="close" @click="$emit('close')">Cancel</button>
        </div>
    </div>
</div>
</template>

<style scoped>
.modify {
    display: flex;
    flex-direction: row;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem
}

input {
    font-size: 1.5rem;
    border: none;
    outline: none;
    background-color: #292929;
    color: #66e4ab;
    padding: 10px;
    text-align: center;
}

.kanji > input {
    height: 100%;
    width: 8rem;
    font-size: 3rem;
    size: 1;
}

.horizontal {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
}

.full > input{
    width: 100%;
}

button, .close {
    font-size: 1rem;
}

.close {
    color: #66e4ab;
    background-color: #181818;
    padding: 0;
}
</style>