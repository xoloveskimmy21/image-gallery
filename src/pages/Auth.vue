<script setup>
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

// google auth button
const googleAuth = async () => await store.dispatch('login')
  .then(e => {
    if (e === true) {
      router.push('/')
    } else {
      setTimeout(() => alert(e ?? 'Failed to login'), 0)
    }
  })

// check if user is logged in, if so redirect to home page
watchEffect(() => {
    if (store.getters['email']) {
        router.push('/')
    }
})
</script>
<template>
  <div class="container">
    <div class="auth">
      <h1>Login</h1>
      <button @click="googleAuth">Login with Google</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .auth {
    background: #111;
    padding: 2rem;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 100%;
    max-width: 300px;

    h1 {
      color: #fff;
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2rem;
    }

    button {
      display: block;
      width: 100%;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 5px;
      background: #333;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        background: #555;
      }
    }
    
  }
}
</style>