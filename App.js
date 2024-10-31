// App.jsx

import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes'; // Certifique-se de que o caminho está correto


const App = () => {

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default App;
