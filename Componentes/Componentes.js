import { useState } from "react"
import { View, Text, StyleSheet, Button, TextInput } from "react-native"

export const Contador = () => {
    const [contador, setcontador] = useState(0)
    return (
        <View>
            <Text style={estilos.texto}>Hola soy el contador</Text>
            <Button title="Incrementa" onPress={()=> setcontador(contador+1)} />
            <Text style={estilos.texto}>Contador: {contador}</Text>
            <Button title="Decrementa" onPress={()=> setcontador(contador-1)} />
            <TextInput placeholder="Valor" onChangeText={(valor)=>setcontador(parseInt(valor))} />
        </View>
    )
}

const estilos = StyleSheet.create({
    texto: {
        fontSize: 30
    }
})
