<script setup>
import { useStore } from 'vuex'
import ImageUploading from './components/ImageUploading.vue';
import GeneralLoading from './components/GeneralLoading.vue';
import AddProduct from './components/AddProduct.vue';
import ViewProduct from './components/ViewProduct.vue';
const store = useStore()
store.dispatch('initAuth')
</script>
<template>
  <router-view />
  <add-product />
  <view-product />
  <general-loading />
  <image-uploading />
</template>