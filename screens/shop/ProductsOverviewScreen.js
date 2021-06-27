import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Button, FlatList, Platform, StyleSheet, ActivityIndicator, View, Text } from 'react-native';

import Colors from "../../constants/Colors";
import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import * as cartAction from '../../store/actions/cart';
import * as productsAction from '../../store/actions/products';

const ProductsOverviewScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title,
        });
    };

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(productsAction.fetchProducts());
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, setError, setIsLoading]);

    useEffect(() => {
        loadProducts();
    }, [dispatch, loadProducts]);

    if (error) {
        return (
            <View style={styles.loader}>
                <Text>An error occurred!</Text>
                <Button
                    title="Try again"
                    onPress={loadProducts}
                    color={Colors.primary}
                />
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    if (!isLoading && products.length === 0 ) {
        return (
            <View style={styles.loader}>
                <Text>No products found.</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }}
                >
                    <Button
                        style={styles.button}
                        color={Colors.primary}
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }}
                        title="View Details"
                    />
                    <Button
                        style={styles.button}
                        color={Colors.accent}
                        title="To Cart"
                        onPress={() => {
                            dispatch(cartAction.addToCart(itemData.item))
                        }}
                    />
                </ProductItem>
            )}
        />
    );
};

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-cart'}
                onPress={() => {
                    navData.navigation.toggleDrawer()
                }}
            />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Cart"
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                    navData.navigation.navigate('Cart')
                }}
            />
        </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 20
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductsOverviewScreen;