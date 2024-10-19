import { firestore, storage } from '../../firebase/firebase';
import { doc, setDoc, getDoc, addDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';

export const createProduct = async (product) => {
    try {
        const doc = {
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image
        }
        const docRef = await addDoc(collection(firestore, "products"), doc);
        return docRef
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export const uploadImage = async (file) => {
    try {
        const storageRef = ref(storage, `products/${file.name}`)
        await uploadBytes(storageRef, file)
        const downloadURL = await getDownloadURL(storageRef)
        return downloadURL
    } catch (error) {
        console.error("Error uploading image: ", error);
    }
}

export const deleteImage = async (url) => {
    try {
        const storageRef = ref(storage, url)
        await storageRef.delete()
    } catch (error) {
        console.error("Error deleting image: ", error);
    }
}

export const getProducts = async () => {
    try {
        const products = [];
        const querySnapshot = await getDocs(collection(firestore, "products"));
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return products;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}

export const getProduct = async (id) => {
    try {
        const productRef = doc(firestore, `products/${id}`);
        const docSnap = await getDoc(productRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error getting document: ", error);
    }
}

export const updateProduct = async (id, product) => {
    try {
        const productRef = doc(firestore, `products/${id}`);
        await setDoc(productRef, product, {merge:true});
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

export const deleteProduct = async (id) => {
    try {
        const productRef = doc(firestore, `products/${id}`);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
            const productData = productSnap.data();
            const imageUrl = productData.image;
            if (imageUrl) {
                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);
            }
            await deleteDoc(productRef);
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error deleting document or image: ", error);
    }
};