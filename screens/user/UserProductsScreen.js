import React from 'react';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { FlatList, Button, Platform, Alert, View, Text } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as productActions from "../../store/actions/products";

const UserProductsScreen = ({ navigation }) => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = id => {
        navigation.navigate('EditProducts', { productId: id });
    };

    const deleteHandler = id => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this item?',
            [
                { text: 'No', style: 'default' },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(productActions.deleteProduct(id));
                    }
                }
            ]
        );
    };

    if (userProducts.length === 0) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>No products found!</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => { editProductHandler(itemData.item.id) }}
                >
                    <Button
                        color={Colors.secondary}
                        title="Edit"
                        onPress={() => { editProductHandler(itemData.item.id) }}
                    />
                    <Button
                        color={Colors.danger}
                        title="Delete"
                        onPress={() => deleteHandler(itemData.item.id)}
                    />
                </ProductItem>
            )}
        />
    );
};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer()
                }}
            />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Add"
                iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => {
                    navData.navigation.navigate('EditProducts')
                }}
            />
        </HeaderButtons>,
    }
};

export default UserProductsScreen;
