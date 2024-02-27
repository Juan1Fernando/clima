import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList, Alert, StyleSheet, TextInput } from 'react-native';

const PeliculasCatalogo = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=02cfae80bc0c56335866ceda764e4ab7')
            .then((res) => res.json())
            .then((data) => {
                if (data.results && data.results.length > 0) {
                    setPeliculas(data.results);
                } else {
                    Alert.alert('No se encontraron películas populares');
                }
                setCargando(false);
            })
            .catch((error) => Alert.alert('Ocurrió un error al cargar las películas: ' + error));
    }, []);

    const renderPelicula = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.poster}
                resizeMode="cover"
            />
            <Text style={styles.overview}>{item.overview}</Text>
        </View>
    );

    const buscarPeliculas = () => {
        return peliculas.filter(pelicula =>
            pelicula.title.toLowerCase().includes(busqueda.toLowerCase())
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Buscar película..."
                onChangeText={text => setBusqueda(text)}
                value={busqueda}
            />
            {cargando ? (
                <Text>Cargando películas...</Text>
            ) : (
                <FlatList
                    data={buscarPeliculas()}
                    renderItem={renderPelicula}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            )}
        </View>
    );
};

const CatalogoDePeliculas = () => (
    <View>
        <Text style={styles.catalogoTitle}>Catálogo de Películas</Text>
        <PeliculasCatalogo />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
    },
    poster: {
        height: 200,
        width: '100%',
        marginBottom: 10,
        borderRadius: 10,
    },
    overview: {
        fontSize: 16,
        color: '#666666',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
        marginVertical: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    catalogoTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default CatalogoDePeliculas;
