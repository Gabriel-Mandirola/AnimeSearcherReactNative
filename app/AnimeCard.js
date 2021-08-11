import 'react-native-gesture-handler';

import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Text, Image, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
let keyss = []
function AnimeCard({ route, navigation }) {
    const [animeData, setAnimeData] = React.useState();
    const [status, setStatus] = React.useState("idle");
    const { anime } = route.params

    const storeData = async (value) => {

        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(value.mal_id, jsonValue)
            console.log(JSON.parse(await AsyncStorage.getItem(value.mal_id)).mal_id)
            console.log("el valor es: 9+++++++++++++++++++++" + value.title)
            console.log(await AsyncStorage.getItem(value.mal_id))
            imprimirAnimeDos()
            getAllKeysDos()
        } catch (e) {
            // saving error
        }
    }

    const removeData = async (key) => {
        try {
            await AsyncStorage.removeItem(key)
            //console.log("asyncccccccccccccccccccccccccccccc" + AsyncStorage)
        } catch (e) {
            // saving error
        }
    }
    const getAllKeysDos = async () => {
        try {
            keyss = await AsyncStorage.getAllKeys()
        } catch (e) {
            // read key error
        }

        for (let i = 0; i < keyss.length; i++) {
            console.log(keyss[0])
            console.log("keys[0]¡?¡?¡?¡?¡?¡?¡?¡?¡?¡?¡?¡")
            console.log(JSON.parse(await AsyncStorage.getItem(keyss[i])).mal_id)


        }
    }

    function imprimirAnimeDos() {
        if (AsyncStorage) {

            console.log("animeData-----------------------------")
            console.log(animeData)
            //console.log(animeData[0].image_url)
        }
    }



    const getData = async (animeID) => {
        try {
            const jsonValue = await AsyncStorage.getItem(animeID)
            if (jsonValue != null) {
                console.log("retorna algo")
                //console.log(JSON.parse(jsonValue))
                return JSON.parse(jsonValue)
            } else {
                console.log("no retorna nada")
                return null
            }
            //return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    const getAllKeys = async () => {
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
        } catch (e) {
            // read key error
        }

        console.log(keys)
        // example console.log result:
        // ['@MyApp_user', '@MyApp_key']
    }
    getAllKeys()

    React.useEffect(() => {
        setStatus("loading");
        if (anime.length > 2) {


            fetch(`https://api.jikan.moe/v3/search/anime?q=${anime}&limit=1`)
                .then((response) => {
                    response.json().then((data) => {
                        setAnimeData(data.results)
                        if (data.results.length !== 0) {
                            setAnimeData(data.results)
                            setStatus("idle")
                        } else {
                            setStatus("error")
                        }
                    })
                })
        } else {
            setStatus("error")
        }
    }, [])

    function storeDataAndPrint() {
        animeData && storeData(animeData[0])
    }
    function deleteData() {
        removeData(animeData[0].mal_id)
    }
    if (status === "idle") {
        return (
            <View style={styles.container}>
                <Text style={styles.text} >Anime Chosen</Text>
                {animeData && <Text style={styles.text}>{animeData[0].title}</Text>}
                <View style={styles.imageConatiner}>
                    {animeData && <Image style={styles.image} source={{ uri: animeData[0].image_url }} />}
                </View>
                <Button
                    title={"agregar a favoritos"}
                    onPress={() => storeDataAndPrint()}
                    style={styles.button}
                />
                <Button
                    title={"Eliminar de favoritos"}
                    onPress={() => deleteData()}
                    style={styles.button}
                />
                {/* <Button
                    title={"Ver favoritos"}
                    onPress={() => navigation.navigate('Favorites')}
                    style={styles.button}
                /> */}

            </View>
        );
    } else if (status === "loading") {
        return (
            <Text>Cargando</Text>
        )
    } else if (status === "error") {
        return (
            <View style={styles.container}>
                <Text>{anime.length > 2 && "Algo salio mal"}{anime.length < 3 && "Ingresa un anime antes de buscar, minimo 3 letras"}</Text>
            </View>
        )
    }
}

export default AnimeCard;

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
    imageConatiner: {
        height: '50%',
        width: '50%',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    button: {
        color: '#FFFFFF',
    }
});