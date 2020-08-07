import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Button,
    StyleSheet
} from 'react-native';
import { useSelector } from "react-redux";

const ProductDetailScreen = ({ navigation }) => {
    const productId = navigation.getParam('productId');
    const selectedProduct = useSelector(
        state => state.products.availableProducts.find(p => p.id === productId)
    );

    ProductDetailScreen.navigationOptions = navData => {
        return {
            headerTitle: navData.navigation.getParam('productTitle')
        }
    };

    return (
        <View>
            <Text>{ selectedProduct.title }</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default ProductDetailScreen;