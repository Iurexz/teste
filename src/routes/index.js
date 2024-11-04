import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/login';
import Money from '../pages/money';
import Store from '../pages/store';
import Profile from '../pages/profile';
import { CustomTabBar } from '../components/customtab';


const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#121212",
        tabBarStyle: {
          backgroundColor: "#FFF",
          borderTopWidth: 0
        }
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: 'compare-arrows',
        }}
      />
      <Tab.Screen
        name="Money"
        component={Money}
        options={{
          tabBarIcon: 'attach-money',
        }}
      />
      <Tab.Screen
        name="Store"
        component={Store}
        options={{
          tabBarIcon: 'storefront',
        }}
      />
      <Tab.Screen
        name="Profile"  // Nome da nova tela
        component={Profile}  // Componente da nova tela
        options={{
          tabBarIcon: 'person',  // Ícone para a nova tela (exemplo)
        }}
      />
    </Tab.Navigator> 
  );
}
