<script setup>
import { useStore } from 'vuex'

const store = useStore()

</script>

<template>
    <div class="wrapper" v-if="store.getters['uploading']">
        <div class="container">
            <div class="msg">Uploading image... {{pct}}</div>
            <div class="progress">
                <div class="progress-bar"></div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.wrapper {
    @apply fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center;
    animation: fadeIn 0.5s ease-in-out;

    .container {
        @apply bg-white m-2 p-4 rounded-lg shadow-lg flex flex-col items-center max-w-sm;
        animation: slideUp 0.3s ease-in-out;

        .msg {
            @apply text-gray-700 font-bold text-lg;
        }

        .progress {
            @apply w-full mt-4 bg-gray-200 rounded-lg;

            .progress-bar {
                @apply h-4 bg-blue-500 rounded-lg;
                width: v-bind("store.state.uploadProgress");
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

@keyframes slideUp {
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
