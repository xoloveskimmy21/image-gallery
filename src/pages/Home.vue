<script setup>
import { watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Product from '../components/Product.vue'

const store = useStore()
const router = useRouter()

// check if user is logged in, if so redirect to home page
watchEffect(() => {
    if (!store.getters['email']) {
        router.push('/auth')
    }
})
</script>
<template>
    <Header />
    <main>
        <div class="products">
            <Product v-for="p in store.getters['products']" :key="p.name" :name="p.name" :reactions="p.reactions" :description="p.description" :price="p.price" :reacted="p.reacted" :photo-url="p.photoUrl" :product="p"/>
        </div>
    </main>
</template>
<style lang="scss" scoped>
main {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem;

    .products {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 400px;
    }
}
</style>