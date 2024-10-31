import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
};
<AntDesign name="bells" size={24} color="black" />

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
  
});

export default Home;
