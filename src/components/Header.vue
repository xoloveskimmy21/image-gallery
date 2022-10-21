<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const logout = async () => {
    if (confirm('Are you sure you want to logout?')) {
        if (await store.dispatch('logout') === true) {
            router.push('/auth')
        } else {
            alert('Something went wrong')
        }
    }
}

// upload image to firebase storage
const upload = async (e) => {
    // open file dialog
    const file = e.target.files[0]
    // upload file to firebase storage
    const url = await store.dispatch('uploadImage', file)
}

// open file picker from #upload input
const openFilePicker = () => {
    document.querySelector('#upload').click()
}

</script>
<template>
    <header>
        <div class="container">
            <div class="brand">
                Kimmy Store
            </div>
            <div class="actions">
                <button @click="store.dispatch('openAddProduct')">Add Product</button>
                <button @click="logout">Logout</button>
                <!-- <button @click="openFilePicker">Upload</button>
                <input id="upload" type="file" @change="upload" class="hidden" /> -->
            </div>
        </div>
    </header>
</template>
<style lang="scss" scoped>
header {
    background: #333;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
        max-width: 800px;
        padding: 20px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .brand {
            font-size: 1.5rem;
            font-family: 'Comforter Brush', cursive;
            text-transform: uppercase;
        }

        .actions {
            display: flex;
            justify-content: flex-end;

            button {
                margin-left: 1rem;
                padding: .5rem 1rem;
                font-size: .8rem;
                font-weight: bold;
                background: #c2c2c2;
                color: #333;
                border-radius: .25rem;
                transition: all .2s;

                &:hover {
                    background: #fff;
                }
            }
        }
    }
}

.hidden {
    display: none;
}
</style>