<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const name = ref('')
const price = ref('')
const description = ref('')

const upload = async (e) => {
    const file = e.target.files[0]
    await store.dispatch('uploadImage', file)
}

const submit = async (e) => {
    e.preventDefault()

    const product = {
        name: name.value,
        price: price.value,
        description: description.value,
        photoUrl: store.state.uploaded,
    }

    await store.dispatch('addProduct', product)
}

// watch store.getters['openAddProduct'] to open or close modal
watch(() => store.state.addProduct, (val) => {
    if (!val) {
        name.value = ''
        price.value = ''
        description.value = ''
    }
})

</script>
<template>
    <div class="add-product-wrapper" v-if="store.getters['addProduct']">
        <form class="add-product" @submit="submit">
            <h1>Add Product</h1>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" autocomplete="off" v-model="name" />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea type="text" id="description" rows="2" autocomplete="off" v-model="description" />
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="number" id="price" v-model="price" />
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input type="file" id="image" @change="upload" />
            </div>
            <div class="image-preview" v-if="store.getters['uploaded']">
                <img :src="store.state.uploaded" />
            </div>
            <div class="actions">
                <button type="button" class="btn btn-secondary" @click="store.dispatch('closeAddProduct')">Cancel</button>
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
</template>
<style lang="scss" scoped>
.add-product-wrapper {
    @apply fixed top-0 left-0 w-full h-full flex justify-center items-center;
    @apply bg-gray-900 bg-opacity-50 p-4;
    animation: fadeIn 0.2s ease-in-out;
    .add-product {
        @apply bg-white rounded max-h-full w-full max-w-md p-6 text-left;
        @apply flex flex-col overflow-y-auto;
        animation: showUp 0.3s ease-in-out;
        h1 {
            @apply text-2xl font-bold mb-6;
        }

        .form-group {
            @apply flex flex-col mb-4;

            label {
                @apply text-sm font-bold;
            }

            input, textarea {
                @apply border border-gray-300 rounded mt-1 p-2 outline-none focus:border-gray-500;
            }

            .sub-input {
                @apply mt-1 p-2;
            }
        }

        .image-preview {
            @apply mb-4 flex justify-center items-center bg-gray-700 w-full overflow-hidden rounded;

            img {
                @apply max-w-full max-h-64 rounded;
            }
        }

        .actions {
            @apply flex justify-end;

            button {
                @apply ml-2 px-4 py-2 rounded transition duration-200 ease-in-out outline-none;
                
                &.btn-secondary {
                    @apply bg-gray-300 text-gray-700;

                    &:hover, &:focus {
                        @apply bg-gray-400;
                    }
                }

                &.btn-primary {
                    @apply bg-blue-500 text-white;

                    &:hover, &:focus {
                        @apply bg-blue-700;
                    }
                }
            }
        }
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes showUp {
    0% {
        transform: translateY(100%) scale(0);
        opacity: 0;
    }

    100% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
}
</style>