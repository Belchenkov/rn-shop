export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

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

            const data = await res.json();
            console.log(data);
            dispatch({
                type: SIGNUP
            });
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

            const data = await res.json();
            console.log(data);
            dispatch({
                type: LOGIN
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
};
