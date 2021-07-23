import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function AnimeCard({ route, navigation }) {
    const [animeData, setAnimeData] = React.useState();
    const [status, setStatus] = React.useState("idle");
    const { anime } = route.params
    console.log(anime)


    React.useEffect(() => {
        setStatus("loading");
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
    }, [])

    function imprimirAnime() {
        if (animeData) {
            console.log(animeData)
            console.log(animeData[0].image_url)
        }
    }

    imprimirAnime()
    if (status === "idle") {
        return (
            <View style={styles.container}>
                <Text style={styles.text} >Anime Chosen</Text>
                {animeData && <Text style={styles.text}>{animeData[0].title}</Text>}
                <View style={styles.imageConatiner}>
                    {animeData && <Image style={styles.image} source={{ uri: animeData[0].image_url }} />}
                </View>
                <Button
                    title="Agregar a favoritos"
                    style={styles.button}
                />

            </View>
        );
    } else if (status === "loading") {
        return (
            <Text>Cargando</Text>
        )
    } else if (status === "error") {
        return (
            <View>
                <Button onClick={() => history.push("/")}>Volver</Button>
                <Text>Algo salio mal</Text></View>
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