import Product from "../../models/Product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const res = await fetch('https://rn-shop-9e0e8-default-rtdb.europe-west1.firebasedatabase.app/products.json');

            if (!res.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await res.json();
            const loadedProducts = [];

            for(const key in data) {
                loadedProducts.push(
                    new Product(
                        key,
                        'u1',
                        data[key].title,
                        data[key].imageUrl,
                        data[key].description,
                        data[key].price,
                    )
                );
            }

            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts
            });
        } catch(err) {
            console.error(error);
            throw err;
        }
    }
};

export const deleteProduct = productId => {
    return async dispatch => {
        try {
            const res = await fetch(`https://rn-shop-9e0e8-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                throw new Error('Something went wrong!');
            }

            dispatch({
                type: DELETE_PRODUCT,
                pid: productId
            });
        } catch(err) {
            console.error(err);
            throw err;
        }
    };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        try {
            const res = await fetch('https://rn-shop-9e0e8-default-rtdb.europe-west1.firebasedatabase.app/products.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                    price
                })
            });

            if (!res.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await res.json();

            dispatch({
                type: CREATE_PRODUCT,
                productData: {
                    id: data.name,
                    title,
                    description,
                    imageUrl,
                    price
                }
            });
        } catch(err) {
            console.error(err);
            throw err;
        }
    }
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch => {
        try {
             const res = await fetch(`https://rn-shop-9e0e8-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl
                })
            });

            if (!res.ok) {
                throw new Error('Something went wrong!');
            }

            dispatch({
                type: UPDATE_PRODUCT,
                pid: id,
                productData: {
                    title,
                    description,
                    imageUrl
                }
            });
        } catch(err) {
            console.error(err);
            throw err;
        }
    }
};
