import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Money = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Hate it Or Love It</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa todo o espaço disponível da tela
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
        backgroundColor: '#FFF', // Adiciona um fundo branco (opcional)
      },
      text: {
        fontSize: 20, // Tamanho do texto (pode ajustar conforme necessário)
        color: '#000', // Cor do texto (preto)
      },

})

export default Money;
