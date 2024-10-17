import { firestore } from '../../firebase/firebase';
import { doc, setDoc, getDoc, addDoc } from 'firebase/firestore';

export const createProduct = async (product) => {
    try {
        const doc = {
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image
        }
        const docRef = await addDoc(collection(firestore, "products"), doc);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}