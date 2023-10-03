import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CompositeNavigationProp, useIsFocused } from '@react-navigation/native';
import { ComponentNavigationProps, NewsData } from '../Utilities/Types';
import CardItem from '../Components/CardItem';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';



const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("@newsData");
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    alert("Error - getData ")
    return;
  }
};

const storeData = async (value: string) => {
  const data:NewsData[]=await getData() || [];
  const filtered = data.filter((news)=>news.title!==value);

  try {
    const jsonValue = JSON.stringify(filtered);
    await AsyncStorage.setItem("@newsData", jsonValue);
  } catch (e) {
    return alert ("Error - storeData ")
  }
};


const Saved = (props:ComponentNavigationProps) => {
  const focused=useIsFocused();
  const [savedNews, setsavedNews] = useState([])
  const deleteHandler = async (val:string)=>{
    await storeData(val);
  }
  useEffect(()=>{
    getData().then((data)=>setsavedNews(data)).catch((err)=>alert("Error - Saved_getData"))
  },[focused, deleteHandler])

  
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Saved"/>
      </Appbar.Header>
      <FlatList keyExtractor={(Item)=>Item.title}
      style={styles.flatlist} data={savedNews} renderItem={({item})=>
      <CardItem handleDelete={deleteHandler} navigation={props.navigation} content={item.content|| ""}  description={item.description|| ""} image_url={item.image_url|| ""} title={item.title|| ""} />
      } />
      
      
    </View>
    /*
    {savedNews && savedNews.length > 0 && savedNews.map((data:NewsData)=><CardItem content={data.content} description={data.description || ""} image_url={data.image_url} 
      navigation={props.navigation} title={data.title} key={data.title}
     */
  )
}

export default Saved

const styles = StyleSheet.create({
  flatlist:{
    display:'flex',
    flex:1,
    height:"auto",
  },
  container:{
    flex:1,
  },
})