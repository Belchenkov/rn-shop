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
                throw new Error('Something went wrong!');
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
                throw new Error('Something went wrong!');
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
