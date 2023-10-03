import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { NewsData } from '../Utilities/Types'
import { useTheme, Card, Button } from 'react-native-paper';
import { NavigationProp, Route, RouteProp } from '@react-navigation/native';

type Props ={
    title:string
    image_url:string 
    description:string 
    content:string 
    navigation:NavigationProp<Route>
    handleDelete?:(val:string)=>void;
}

const CardItem = (props:Props) => {
    const theme = useTheme();
    const handlePress = ()=>{
        props.navigation.navigate("NewsOverview",{title:props.title, description:props.description, image_url:props.image_url, content:props.content})
    }
  return (
    <Pressable onPress={handlePress}>
        <Card style={{marginVertical:10, backgroundColor:theme.colors.elevation.level5}}>
            <Card.Cover borderRadius={10} source={{uri:props.image_url}} />
            <Card.Title title={props.title} subtitle={props.description.split("\n")[0]} titleNumberOfLines={1}/>
            { props.handleDelete &&( <Card.Actions>
                <Button onPress={()=>props.handleDelete && props.handleDelete(props.title)}> Delete </Button>
            </Card.Actions>)}
        </Card>
    </Pressable>
  )
}

export default CardItem

const styles = StyleSheet.create({})