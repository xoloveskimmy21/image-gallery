<script setup>
import { useStore } from 'vuex'
import IconHeart from '~icons/mdi/cards-heart'
import IconUnheart from '~icons/mdi/cards-heart-outline'

const store = useStore()

const p = defineProps({
    photoUrl: String,
    name: String,
    price: Number,
    description: String,
    reactions: Array,
    reacted: Boolean,
    product: Object
});

</script>

<template>
    <div class="product">
        <div class="product-top" @click="store.dispatch('openProduct', p)">
            <div class="img"><img :src="p.photoUrl"></div>
        </div>
        <div class="product-body">
            <div class="meta">
                <span class="react">
                    <button v-if="p.reacted" @click="store.dispatch('react',p.name)">
                        <icon-heart class="icon" />
                    </button>
                    <button v-else @click="store.dispatch('react', p.name)">
                        <icon-unheart class="icon" />
                    </button>
                    <span class="count">{{p.reactions.length}}</span>
                </span>
                <span class="price">{{ p.price }}</span>
            </div>
            <div class="name" @click="store.dispatch('openProduct', p)">{{ p.name }}</div>
            <div class="description" @click="store.dispatch('openProduct', p)">{{ p.description }}</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.product {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;

    .product-top {
        border-radius: .5rem .5rem 0 0;
        overflow: hidden;
        position: relative;
        cursor: pointer;

        .img {
            width: 100%;
            height: auto;
            max-height: 400px;
            background: #333;

            img {
                width: auto;
                height: auto;
                min-height: 100%;
                min-width: 100%;
                max-height: 100%;
                max-width: 100%;
            }
        }
    }

    .product-body {
        width: 100%;
        padding: .5rem;
        border: 1px solid #ccc;
        border-radius: 0 0 .5rem .5rem;

        .meta {
            display: flex;
            justify-content: space-between;
            margin: .5rem 0 1rem 0;

            .react {
                display: flex;

                button {
                    margin: 0 .25rem 0 0;
                    padding: 0;
                    background: none;

                    .icon {
                        width: 1.5rem;
                        height: 1.5rem;
                        fill: #fff;
                        transition: all .2s;

                        &:hover {
                            fill: #ff0000;
                        }
                    }
                }

                .count {
                    font-size: .8rem;
                    font-weight: bold;
                    color: #777;
                }
            }

            .price {
                &::before {
                    content: '₱';
                }
            }
        }

        .name {
            text-align: left;
            font-weight: bold;
            line-height: 1rem;
            font-size: 1rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            cursor: pointer;
        }

        .description {
            text-align: left;
            font-size: .9rem;
            line-height: .9rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            cursor: pointer;
        }
    }
}
</style>