import React, { useEffect, useState } from 'react';
import { FlatList, Platform, ActivityIndicator, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import { fetchOrders } from "../../store/actions/orders";
import Colors from "../../constants/Colors";

const OrdersScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(fetchOrders()).then(() => setIsLoading(false));
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="small" color={Colors.primary} />
            </View>
        )
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => (
               <OrderItem
                   amount={itemData.item.totalAmount}
                   date={itemData.item.readableDate}
                   items={itemData.item.items}
               />
            )}
        />
    );
};

OrdersScreen.navigationOptions = navData => {
    return {
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-cart'}
                onPress={() => {
                    navData.navigation.toggleDrawer()
                }}
            />
        </HeaderButtons>,
        headerTitle: 'Your Orders'
    }
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default OrdersScreen;