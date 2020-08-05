import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

import Colors from "../../constants/Colors";

const ProductItem = ({ onViewDetail, onAddToCart, image, title, price }) => {
    return (
        <View style={styles.product}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: image}} />
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{ title }</Text>
                <Text style={styles.price}>{ price.toFixed(2) }</Text>
            </View>
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    onPress={onViewDetail}
                    title="View Details"
                />
                <Button
                    color={Colors.accent}
                    title="To Cart"
                    onPress={onAddToCart}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: .26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
});

export default ProductItem;