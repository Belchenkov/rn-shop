import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from "react-redux";
import { Text } from 'react-native';

const ProductsOverviewScreen = () => {
    const products = useSelector(state => state.products.availableProducts);

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => <Text>{itemData.item.title}</Text>}
        />
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
};

export default ProductsOverviewScreen;