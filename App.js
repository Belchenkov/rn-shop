import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from "./store/reducers/orders";
import ShopNavigator from "./navigation/ShopNavigator";
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
    return Font.loadAsync({
        'work-sans': require('./assets/fonts/WorkSans-Regular.ttf'),
        'work-italic': require('./assets/fonts/WorkSans-Italic.ttf'),
        'work-bold': require('./assets/fonts/WorkSans-Bold.ttf'),
        'lobster-bold': require('./assets/fonts/LobsterTwo-Bold.ttf'),
        'lobster-sans': require('./assets/fonts/LobsterTwo-Regular.ttf'),
    })
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => {
                    setFontLoaded(true);
                }}
            />
        );
    }

    return (
        <Provider store={store}>
          <ShopNavigator />
        </Provider>
    );
}
