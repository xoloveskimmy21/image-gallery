// create vue app store
import { createStore } from 'vuex'
import { auth, db, storage } from './firebase.js'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const state = () => ({
    email: '',
    loading: false,
    uploaded: "",
    uploadProgress: 0,
    uploading: false,
    products: [],
    addProduct: false,
    openProduct: false,
    openProductData: {
        name: '',
        price: '',
        description: '',
        image: '',
        reactions: [],
        reacted: false,
    },
})

const mutations = {
    setEmail(state, payload) {
        state.email = payload
    },
    setLoading(state, payload) {
        state.loading = payload
    },
    setUploading(state, payload) {
        state.uploading = payload
    },
    setProducts(state, payload) {
        state.products = payload
    },
    setAddProduct(state, payload) {
        state.addProduct = payload
    },
    setUploaded(state, payload) {
        state.uploaded = payload
    },
    setUploadProgress(state, payload) {
        state.uploadProgress = payload
    },
    setOpenProduct(state, payload) {
        state.openProduct = payload
    },
    setOpenProductData(state, payload) {
        state.openProductData = payload
    }
}

const actions = {
    async login(context) {
        const provider = new GoogleAuthProvider()
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

        return await signInWithPopup(auth, provider)
            .then(e => {
                const email = e?.user?.email
                context.commit('setEmail', email)
                return true
            })
            .catch(e => {
                return e?.message
            })
    },
    async logout() {
        return signOut(auth).then(() => {
            return true
        }).catch((error) => {
            return error?.message ?? 'Error logging out'
        });
    },
    async initAuth(context) {
        onAuthStateChanged(auth, user => {
            if (user) {
                context.commit('setEmail', user.email)
                context.dispatch('fetchProducts')
            } else {
                context.commit('setEmail', '')
            }
        })
    },
    async uploadImage(context, payload) {
        context.commit('setUploading', true)
        context.commit('setUploadProgress', 0)
        const file = payload
        const name = file.name
        const uploadname = Date.now() + '-' + name
        const storageRef = ref(storage, `gallery/${uploadname}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                context.commit('setUploadProgress', progress)
            },
            (error) => {
                alert(error?.message ?? 'Error uploading image')
                context.commit('setUploading', false)
            }
            , () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    context.commit('setUploaded', downloadURL)
                    context.commit('setUploading', false)
                    context.commit('setUploadProgress', 0)
                    context.dispatch('fetchProducts')
                })
            })

    },
    resetUploading(context) {
        context.commit('setUploading', false)
        context.commit('setUploadProgress', 0)
        context.commit('setUploaded', '')
    },
    openAddProduct(context) {
        context.commit('setAddProduct', true)
    },
    closeAddProduct(context) {
        context.commit('setAddProduct', false)
    },
    async addProduct(context, payload) {
        const { name, description, price, photoUrl } = payload
        const product = {
            name,
            description,
            price,
            photoUrl,
            dateCreated: Date.now(),
            reactions: []
        }
        await setDoc(doc(db, "products", name), product);
        context.dispatch('closeAddProduct')
        context.dispatch('resetUploading')
        context.dispatch('fetchProducts')
    },
    fetchProducts(context) {
        context.commit('setLoading', true)
        getDocs(collection(db, "products")).then((querySnapshot) => {
            const products = []
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                data.reacted = data.reactions.includes(context.state.email)
                products.push(data)
            });
            context.commit('setProducts', products)
            context.commit('setLoading', false)
        })
    },
    PostUpdateProduct(context, payload) { 
        const { name, description, price, photoUrl, reactions } = payload
        const product = {
            name,
            description,
            price,
            photoUrl,
            dateCreated: Date.now(),
            reactions
        }
        setDoc(doc(db, "products", name), product);
    },
    react(context, name) {
        const products = context.state.products
        const product = products.find(p => p.name === name)
        const reactions = product.reactions
        const reacted = reactions.includes(context.state.email)
        if (reacted) {
            const index = reactions.indexOf(context.state.email)
            reactions.splice(index, 1)
        } else {
            reactions.push(context.state.email)
        }
        product.reacted = !reacted
        context.commit('setProducts', products)
        context.dispatch('PostUpdateProduct', product)
    },
    openProduct(context, payload) {
        context.commit('setOpenProduct', true)
        context.commit('setOpenProductData', payload)
    },
    closeProduct(context) {
        context.commit('setOpenProduct', false)
        context.commit('setOpenProductData', {
            name: '',
            price: '',
            description: '',
            image: '',
            reactions: [],
            reacted: false,
        })
    },
    react2(context) {
        const name = context.state.openProductData.name
        const products = context.state.products
        const product = products.find(p => p.name === name)
        const reactions = product.reactions
        const reacted = reactions.includes(context.state.email)
        if (reacted) {
            const index = reactions.indexOf(context.state.email)
            reactions.splice(index, 1)
        }
        else {
            reactions.push(context.state.email)
        }
        product.reacted = !reacted
        context.commit('setProducts', products)
        context.commit('setOpenProductData', product)
        context.dispatch('PostUpdateProduct', product)
    }
}

const getters = {
    email: state => state.email,
    loading: state => state.loading,
    uploading: state => state.uploading,
    products: state => state.products.map(p => {
        return {
            ...p,
            isReacted: p.reactions.includes(state.email),
        }
    }),
    uploaded: state => state.uploaded,
    uploadProgress: state => state.uploadProgress,
    addProduct: state => state.addProduct,
    openProduct: state => state.openProduct,
    openProductData: state => state.openProductData
}

export const store = createStore({
    state,
    mutations,
    actions,
    getters
})

export default store