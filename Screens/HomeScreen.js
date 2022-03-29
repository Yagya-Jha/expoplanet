import * as React from 'react'
import {View, Text, Alert, StyleSheet, FlatList, SafeAreaView} from 'react-native'
import { ListItem } from 'react-native-elements'
import axios from 'axios'

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state = {list_data: [], url: 'http://127.0.0.1:5000/'};
    }

    get_planet_info=()=>{
        const {url} = this.state;
        axios.get(url).then(response=>{
            console.log(response.data.data);
            return this.setState({list_data: response.data.data});
        }).catch(e=>{
            Alert.alert(e.message);
        });
    }

    componentDidMount(){
        this.get_planet_info();
    }
    renderItem = ({item, index})=>(
        <ListItem 
        key = {index}
        title = {`Planet Name: ${item.Name}`}
        subtitle = {`DIstance From Earth: ${item.Distance_from_earth}`}
        bottomDivider
        onPress={()=>this.props.navigation.navigate("Details", {planet_name: item.Name})}
        />
    );
    keyExtractor = (item, index)=>index.toString();
    render(){
        const{list_data} = this.state;
        if(list_data.length===0){
            return(<Text>Loading...</Text>)
        }else{
            return(
                <View>
                    <SafeAreaView />
                    <Text>Planets World</Text>
                    <FlatList 
                        keyExtractor={this.keyExtractor}
                        data = {list_data}
                        renderItem={this.renderItem}
                    />
                </View>
                )
            }
        }
}