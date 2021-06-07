import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView, Text, TextInput, StyleSheet, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import * as productsActions from '../../store/actions/products';
import Input from "../../components/UI/Input";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };

        let updatedFormIsValid = true;

        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }

        return {
            ...state,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        };
    }

    return state;
};

const EditProductScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const prodId = navigation.getParam('productId');
    const editedProduct = useSelector(
        state => state.products.userProducts.find(prod => prod.id === prodId)
    );

    const [ formState, dispatchFormState ] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct?.title || '',
            imageUrl: editedProduct?.imageUrl || '',
            description: editedProduct?.description || '',
            price: editedProduct?.price || '',
        },
        inputValidities: {
            title: !!editedProduct?.title || false,
            imageUrl: !!editedProduct?.imageUrl || false,
            description: !!editedProduct?.description || false,
            price: !!editedProduct?.price || false,
        },
        formIsValid: !!editedProduct || false
    });

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                { text: 'OK' }
            ])
            return
        }

        if (editedProduct) {
            dispatch(productsActions.updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl
            ));
        } else {
            dispatch(productsActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price
            ));
        }

        navigation.goBack();
    }, [
        dispatch,
        prodId,
        formState
    ]);

    useEffect(() => {
        navigation.setParams({
            submit: submitHandler
        });
    }, [submitHandler])


    const textChangeHandler = (inputIdentifier, text) => {
       let isValid = false;

       if (text.trim().length > 0) {
           isValid = true;
       }

       dispatchFormState({
           type: FORM_INPUT_UPDATE,
           value: text,
           isValid,
           input: inputIdentifier
       });
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    label='Title'
                    errorText='Please enter a valid title!'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    autoCorrect
                    returnKeyType='next'
                />
                <Input
                    label='Image URL'
                    errorText='Please enter a valid image url!'
                    keyboardType='default'
                    returnKeyType='next'
                />
                { !editedProduct && (
                    <Input
                        label='Price'
                        errorText='Please enter a valid price!'
                        keyboardType='decimal-pad'
                        returnKeyType='next'
                    />
                )}
                <Input
                    label='Description'
                    errorText='Please enter a valid description!'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    autoCorrect
                    multiline
                    numberOfLines={3}
                />
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
    }
});

export default EditProductScreen;
