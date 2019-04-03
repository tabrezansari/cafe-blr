
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Cart from './src/components/cart';
import Home from './src/components/Home';
import Login from './src/components/Login'

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  Cart: { screen: Cart },
  Login: { screen: Login }

}, { headerMode: "none" });

const App = createAppContainer(MainNavigator);

export default App