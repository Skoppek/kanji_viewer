<script setup>
import Modify from './Modify.vue'
</script>

<script>
export default {
    name: 'Kanji',
    data() {
        return {
            isModifyModalOpen: false,
        }
    },
    props: {
        info: Object,
        isLoggedIn: Boolean
    },
    emits: [
        'delete',
        'modify'
    ],
    methods: {
        modify(newKanji) {
            this.$emit('modify', newKanji, this.info.id)
            this.isModifyModalOpen = false
        }
    }
}
</script>

<template>
<Teleport to="#modal">
    <Modify
        v-if="this.isModifyModalOpen"
        :old="info"
        @close="() => {this.isModifyModalOpen = false}"
        @modify="modify"
    />
</Teleport>
<div class="card">
    <div class="horizontal">
        <div class="info">
            <div class="label">On-yomi</div>
            <div class="value">{{ this.info.onyomi }}</div>
        </div>
        <div class="info">
            <div class="label">Kun-yomi</div>
            <div class="value">{{ this.info.kunyomi }}</div>
        </div>
    </div>
    <div class="kanji">{{ this.info.kanji }}</div>
    <div class="info">
        <div class="label">Meanings</div>
        <div class="value">{{ this.info.meanings }}</div>
    </div>
    <div class="controls horizontal" v-if="isLoggedIn">
        <button @click="this.isModifyModalOpen = true">MODIFY</button>
        <button @click="$emit('delete', this.info.id)">DELETE</button>
    </div>
</div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 1rem 0 1rem 0;
    color: #42b883;
    width: 40vw;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    border-bottom: solid 2px #215840;
}

.controls {
    padding-top: 1rem;
}

.kanji {
    font-size: 10rem;
}

.horizontal {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.label {
    color: #359469;
}

.value {
    font-size: 2rem;
    text-align: center;
}

button {
    font-size: 1rem;
    padding: 0.4rem;
}

</style>