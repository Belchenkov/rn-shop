import { AsyncStorage } from "react-native";

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (userId, token) => {
    return {
        type: AUTHENTICATE,
        userId,
        token
    };
};

export const signUp = (email, password) => {

    return async dispatch => {
        try {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYLVY68nnRmENWr6-gdNGa6_sjBCBtG60', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            });

            if (! res.ok) {
                const errorData = await res.json();
                const errorId = errorData.error.message;
                let message = '';

                switch (errorId) {
                    case 'EMAIL_EXISTS':
                        message = 'This email exists already!';
                        break;
                    default:
                        message = 'Something went wrong!'
                        break;
                }

                throw new Error(message);
            }

            const { idToken, localId, expiresIn } = await res.json();

            dispatch(authenticate(idToken, localId));

            // Save to AsyncLS
            const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000).toISOString();
            saveDataToStorage(idToken, localId, expirationDate);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
};

export const login = (email, password) => {
    return async dispatch => {
        try {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYLVY68nnRmENWr6-gdNGa6_sjBCBtG60', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            });

            if (! res.ok) {
                const errorData = await res.json();
                const errorId = errorData.error.message;
                let message = '';

                switch (errorId) {
                    case 'EMAIL_NOT_FOUND':
                        message = 'This email could not be found!';
                        break;
                    case 'INVALID_PASSWORD':
                        message = 'This password is not valid!';
                        break;
                    default:
                        message = 'Something went wrong!'
                        break;
                }

                throw new Error(message);
            }

            const { idToken, localId, expiresIn } = await res.json();

            dispatch(authenticate(idToken, localId));

            // Save to AsyncLS
            const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000);
            saveDataToStorage(idToken, localId, expirationDate);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    }
};

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        userId,
        expiryDate: expirationDate.toISOString()
    }));
};
