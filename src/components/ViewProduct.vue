<script setup>
import { useStore } from 'vuex'
import IconHeart from '~icons/mdi/cards-heart'
import IconUnheart from '~icons/mdi/cards-heart-outline'
import IconClose from '~icons/mdi/close-circle'

const store = useStore()

</script>
<template>
    <div class="view-product" v-if="store.state.openProduct">
        <div class="product-top">
            <div class="img"><img :src="store.state.openProductData.photoUrl"></div>
            <button @click="store.dispatch('closeProduct')">
                <icon-close class="close" />
            </button>
        </div>
        <div class="product-body">
            <div class="meta">
                <span class="react">
                    <button v-if="store.state.openProductData.reacted" @click="store.dispatch('react2')">
                        <icon-heart class="icon" />
                    </button>
                    <button v-if="!store.state.openProductData.reacted" @click="store.dispatch('react2')">
                        <icon-unheart class="icon" />
                    </button>
                    <span class="count">{{store.state.openProductData.reactions.length}}</span>
                </span>
                <span class="price">{{store.state.openProductData.price}}</span>
            </div>
            <div class="name">{{store.state.openProductData.name}}</div>
            <div class="description">{{store.state.openProductData.description}}</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.view-product {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #fff;
    overflow-x: hidden;
    @apply flex flex-col md:flex-row overflow-y-auto md:overflow-y-hidden;

    .product-top {
        @apply flex-1 md:flex-[2] md:h-screen;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .img {
            width: 100%;
            height: 100%;
            background: #1f1f1f;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                max-width: 100%;
                max-width: 100%;
                width: auto;
                height: auto;
            }
        }

        button {
            position: absolute;
            top: 2rem;
            right: 2rem;
            background: none;
            border: none;
            cursor: pointer;
            outline: none;
            color: #fff;
            font-size: 2rem;
            transition: all 0.2s ease-in-out;

            &:hover {
                color: #ccc;
            }
        }
    }

    .product-body {
        @apply flex flex-col flex-[0] md:flex-1 md:justify-start md:items-start;
        @apply md:m-[.75rem] md:border md:overflow-y-auto md:overflow-x-hidden;
        @apply p-2 md:p-4 md:rounded-lg;
        background: #fff;

        .meta {
            @apply flex flex-row mb-2;
            width: 100%;
            background: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .react {
                @apply flex flex-row;
                height: 100%;
                background: #fff;
                display: flex;
                justify-content: space-between;
                align-items: center;

                button {
                    @apply flex flex-row;
                    font-size: 1.5rem;
                    background: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;

                    .icon {
                        width: 100%;
                        height: 100%;
                        fill: #333;
                    }
                }

                .count {
                    @apply flex flex-row;
                    width: 30px;
                    height: 100%;
                    background: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }

            .price {
                @apply flex flex-row;
                height: 100%;
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: center;

                &::before {
                    content: '₱';
                }
            }
        }

        .name {
            @apply flex flex-row text-left font-bold;
        }

        .description {
            @apply flex flex-row text-left text-[.8rem];
            line-height: 1rem;
        }
    }
}
</style>