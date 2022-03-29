import * as React from 'react'
import HomeScreen from './Screens/HomeScreen'
import DetailsScreen from './Screens/Details'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

export default class App extends React.Component{
    render(){
        return(
          <Appcontainer />
        );
    }
}

const appstacknavigator = createStackNavigator({
  Home: {screen: HomeScreen, navigationOptions: {headerShown: false}},
  Details: {screen: DetailsScreen}},
  {initialRouteName: "Home"}
);

const Appcontainer = createAppContainer(appstacknavigator);