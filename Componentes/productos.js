import { Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Boton } from "./Atomicos"

const Productos = () => {
    const [prod, setProd] = useState(null)

    const [load, setLoad] = useState(false)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/3')
            .then((res) => res.json())
            .then((obj) => {
                setProd(obj)
                setLoad(true)
            })
            .catch((err) => Alert.alert('Ocurrio un error nenis: ' + err))
    }, [])

    const screent = () => {
        return (
            <View><Text>Titulo: {prod.title} </Text>
                <Text>Precio:${prod.price} </Text>
                <Image source={{ uri: prod.image }} style={{ height: 100, width: 100 }} />
                <Text>Descripcion:{prod.description} </Text>
                <Text>Valoracion:{prod.rating.rate} </Text></View>
        )

    }

    const screentU = () => {
        return (
            <Text>Cargando datos...</Text>
        )

    }

    return (
        <View>
            {load ? (
                screent()
            ) : (
                screentU()
            )}

        </View>
    )

}
export default Productos;