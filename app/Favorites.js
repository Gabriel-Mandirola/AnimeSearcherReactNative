import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Button, Text } from 'react-native';

function Favorites({ route, navigation }) {
    let keys = []
    let favorites = []
    const getAllKeys = async () => {
        // let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
            console.log(keys.length + "keys")
            console.log(keys[0])
            console.log("asdasdasdasd")
        } catch (e) {
            console.log(e)
        }
        console.log(keys)
        // example console.log result:
        // ['@MyApp_user', '@MyApp_key']
    }
    console.log(keys.length + "keysasdasd")
    getAllKeys()
    console.log(keys.length + "keysasdasd")
    const getAllData = async () => {
        console.log(keys.length + "aaaaaaaaaaaaaaaa")
        try {
            console.log("largo de keys" + keys.length)
            for (let i = 0; i <= keys.length; i++) {
                const jsonValue = await AsyncStorage.getItem(keys[i])
                console.log(i)
                //console.log(JSON.parse(jsonValue))
                favorites[i] = JSON.parse(jsonValue)
                console.log(favorites[i])
                return JSON.parse(jsonValue)
                //return jsonValue != null ? JSON.parse(jsonValue) : null;
            }
        } catch (e) {
            // error reading value
            console.log(e)
        }
    }
    // getAllKeys()

    return (
        <View style={styles.container}>
            {favorites.map((item) => {


                <Text style={styles.text}>
                    nombre={keys[item]}
                </Text>

            })}
            <Text style={styles.text}>asdasd</Text>
            <Button
                title={"Ver favoritos"}
                onPress={() => getAllData()}
            />
        </View>
    );
}

export default Favorites;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B7AC2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#FFee99'
    },
});