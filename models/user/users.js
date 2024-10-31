import { firestore } from '../../firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const createUser = async (user) => {
    try {
        const userRef = doc(firestore, `users/${user.uid}`);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            return;
        } else {
            const docData = {
                isAdmin: false,
                displayName: user.displayName || '', 
                email: user.email || '',
                address: user.address || '', 
                phoneNumber: user.phoneNumber || ''
            }
            setDoc(userRef, docData);
        }
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export const getUser = async (uid) => {
    try {
        const userRef = doc(firestore, `users/${uid}`);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            return docSnap.data().isAdmin;
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error getting document: ", error);
    }
}

export const updateUser = async (user) => {
    try {
        const userRef = doc(firestore, `users/${user.uid}`);
        await setDoc(userRef, {
            displayName: user.displayName, 
            email: user.email, 
            address: user.address, 
            phoneNumber: user.phoneNumber 
        }, { merge: true });  
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}
