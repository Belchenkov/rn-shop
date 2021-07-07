import Order from "../../models/Order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;

        try {
            const res = await fetch(`https://rn-shop-9e0e8-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json`);

            if (!res.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await res.json();
            const loadedOrders = [];

            for(const key in data) {
                loadedOrders.push(
                    new Order(
                        key,
                        data[key].cartItems,
                        data[key].totalAmount,
                        new Date(data[key].date)
                    )
                );
            }

            dispatch({
                type: SET_ORDERS,
                orders: loadedOrders
            })
        } catch(err) {
            console.error(error);
            throw err;
        }
     };
};

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const date = new Date();

        try {
            const res = await fetch(
                `https://rn-shop-9e0e8-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cartItems,
                        totalAmount,
                        date: date.toISOString()
                    })
                }
            );

            if (!res.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await res.json();

            dispatch({
                type: ADD_ORDER,
                orderData: {
                    id: data.name,
                    items: cartItems,
                    amount: totalAmount,
                    date
                }
            });
        } catch(err) {
            console.error(err);
            throw err;
        }
    }
};