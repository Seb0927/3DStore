import { firestore, storage } from '../../firebase/firebase';
import { doc, setDoc, getDoc, addDoc, collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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

export const getProducts = async () => {
    try {
        const products = [];
        const querySnapshot = await getDocs(collection(firestore, "products"));
        querySnapshot.forEach((doc) => {
            products.push(doc.data());
        });
        return products;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}