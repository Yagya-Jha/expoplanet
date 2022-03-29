import * as React from 'react'
import {View, Text, Alert, StyleSheet} from 'react-native'
import { Card } from 'react-native-elements';

export default class DetailsScreen extends React.Component{
    constructor(){
        super();
        this.state = {details: [], img_path: '', url: `http://127.0.0.1:5000/planet?Name=${this.props.navigation.getParam("planet_name")}`};
    }
    setDetails=(data)=>{
        const planet_type=data.planet_type;
        let image_path = '';
        switch(planet_type){
            case "Gas Giant":
                image_path = require('../assets/gas_giant.png');
                break;
            
            case "Terrestrial":
                image_path = require('../assets/terrestrial.png');
                break;

            case "Super Earth":
                image_path = require('../assets/super_earth.png');
                break;

            case "Neptune Like":
                image_path = require('../assets/neptune_like.png');
                break;
            
            default: 
                image_path = require('../assets/gas_giant.png');
        }
        this.setState({details: data, img_path: image_path});
    }
    getData=()=>{
        const {url}=this.state;
        axios.get(url).then(response=>{
            this.setDetails(response.data.data);
        }).catch(e=>{
            Alert.alert(e.message);
        });
    }
    componentDidMount(){
        this.getData();
    }
    render(){
        const {details, img_path} = this.state;
        if(details.Specification)
        {
            return(
                <View style = {styles.container}>
                    <Card 
                        title = {details.Name}
                        image = {img_path}
                        imageProps = {{resizemode: "contain", width: '100%'}}
                    />
                    <View>
                        <Text style = {styles.carditem}>Distance From Earth: {details.Distance_from_earth}</Text>
                        <Text style = {styles.carditem}>Distance From Their Sun: {details.Distance_from_their_star}</Text>
                        <Text style = {styles.carditem}>Gravity: {details.gravity}</Text>
                        <Text style = {styles.carditem}>Orbital Period: {details.orbital_period}</Text>
                        <Text style = {styles.carditem}>Orbital Speed: {details.orbital_speed}</Text>
                        <Text style = {styles.carditem}>Planet Mass: {details.planet_mass}</Text>
                        <Text style = {styles.carditem}>Planet Radius: {details.planet_radius}</Text>
                        <Text style = {styles.carditem}>Planet Type: {details.planet_type}</Text>
                    </View>
                    <View style = {[styles.carditem, {flexDirection: "column"}]}>
                        <Text>{details.Specification?'Specification: ': ''}</Text>
                        {details.Specification.map((item,index)=>{
                            <Text key={index.toString()} style={{marginLeft: 50}}>{item}</Text>
                        })}
                    </View>
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    carditem: {
        marginBottom: 10
    }
});