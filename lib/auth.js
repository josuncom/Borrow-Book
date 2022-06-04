import auth from "@react-native-firebase/auth";
import react, { createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = userState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try{
                        auth().signInWithEmailAndPassword(email, password)
                    } catch(e){
                        console.log(e);
                    }
                },
                register: async (email, password) => {
                    try{
                        await auth().createUserWithEmailAndPassword(email, password);
                    } catch(e){
                        console.log(e);
                    }
                },
                logout: async () =>{
                    try{
                        await auth().signOut();
                    } catch(e){
                        console.log(e);
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function signIn({email, password}){
    return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({email, password}){
    return auth().createUserWithEmailAndPassword(email, password)
}

export function subscribeAuth(callback){
    return auth().onAuthStateChanged(callback);
}

export function signOut(){
    return auth().signOut();
}