import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView, Text, TextInput, StyleSheet, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import * as productsActions from '../../store/actions/products';
import { act } from 'react-dom/test-utils';

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
    // const [title, setTitle] = useState(editedProduct?.title || '');
    // const [titleIsValid, setTitleIsValid] = useState(false);
    // const [imageUrl, setImageUrl] = useState(editedProduct?.imageUrl || '');
    // const [price, setPrice] = useState(editedProduct?.price || null);
    // const [description, setDescription] = useState(editedProduct?.description || '');

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
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.title}
                        onChangeText={text => textChangeHandler('title', text)}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                    />
                    { !formState.inputValidities.title && <Text>Please enter a valid title!</Text> }
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.imageUrl}
                        onChangeText={text => textChangeHandler('imageUrl', text)}
                    />
                </View>
                { !editedProduct && (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={formState.inputValues.price}
                            onChangeText={text => textChangeHandler('price', text)}
                            keyboardType='decimal-pad'
                        />
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.description}
                        onChangeText={text => textChangeHandler('description', text)}
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
