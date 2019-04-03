import {createStackNavigator, createAppContainer} from 'react-navigation';
 import Home from './Home';
 import Cart from './cart';
const MainNavigator = createStackNavigator({
    Home: {screen: Home},
    Cart: {screen: Cart},
  });
  
  const App = createAppContainer(MainNavigator);
  
  export default App;