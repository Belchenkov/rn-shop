import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Button,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import * as cartAction from '../../store/actions/cart';

const ProductDetailScreen = ({ navigation }) => {
    const productId = navigation.getParam('productId');
    const selectedProduct = useSelector(
        state => state.products.availableProducts.find(p => p.id === productId)
    );
    const dispatch = useDispatch();

    ProductDetailScreen.navigationOptions = navData => {
        return {
            headerTitle: navData.navigation.getParam('productTitle')
        }
    };

    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{ uri: selectedProduct.imageUrl }}
            />
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title="Add to Cart"
                    onPress={() => {
                        dispatch(cartAction.addToCart(selectedProduct));
                    }}
                />
            </View>
            <Text style={styles.price}>{ selectedProduct.price.toFixed(2) }</Text>
            <Text style={styles.description}>{ selectedProduct.description }</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'work-bold'
    },
    description: {
        fontFamily: 'work-italic',
        textAlign: 'center',
        fontSize: 14,
        marginHorizontal: 20
    }
});

export default ProductDetailScreen;