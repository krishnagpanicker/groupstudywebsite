import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/library/firebaseConfig';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const router = useRouter();
    const { asPath } = useRouter();

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, (user) => {
            if (user) {
                console.log("Token or user state changed: ", user);
                user.getIdToken().then((token) => {
                    console.log("New ID Token: ", token);
                });
                setUser(user);
            }
            else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <Context.Provider value={{user, setUser}}>
            { children }
        </Context.Provider>
    );
}

export const useStateContext = () => useContext(Context);