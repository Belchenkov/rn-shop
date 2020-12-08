import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import * as productsActions from '../../store/actions/products';

const EditProductScreen = ({ navigation }) => {
    const prodId = navigation.getParam('productId');
    const editedProduct = useSelector(
        state => state.products.userProducts.find(prod => prod.id === prodId)
    );
    const [title, setTitle] = useState(editedProduct?.title || '');
    const [imageUrl, setImageUrl] = useState(editedProduct?.imageUrl || '');
    const [price, setPrice] = useState(editedProduct?.price || null);
    const [description, setDescription] = useState(editedProduct?.description || '');

    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(productsActions.updateProduct(
                prodId,
                title,
                description,
                imageUrl
            ));
        } else {
            dispatch(productsActions.createProduct(
                title,
                description,
                imageUrl,
                +price
            ));
        }
    }, [dispatch, prodId, title, description, imageUrl, price]);

    useEffect(() => {
        navigation.setParams({
            submit: submitHandler
        });
    }, [submitHandler])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)}
                    />
                </View>
                { !editedProduct && (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={text => setPrice(text)}
                        />
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add Product',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Save"
                iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                onPress={submitFn}
            />
        </HeaderButtons>,
    }
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        marginBottom: 6
    },
    label: {
        fontFamily: 'work-bold',
        marginVertical: 5
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 1,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;
