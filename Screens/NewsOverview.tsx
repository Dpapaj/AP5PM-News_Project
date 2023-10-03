import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ComponentNavigationProps, NewsData } from '../Utilities/Types'
import CardDetails from '../Components/CardDetails';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const storeData = async (value: NewsData) => {
  const data:NewsData[]=await getData() || [];
  !data.find((d)=>d.title===value.title) ? data.push(value): data ;
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("@newsData", jsonValue);
  } catch (e) {
    return alert ("Error - storeData ")
  }
};

const NewsOverview = (props: ComponentNavigationProps) => {
  const { title, content, image_url } = props?.route?.params as NewsData;

  props.navigation.setOptions({
    headerRight: () =>
      <Button
        rippleColor="#0080ff"
        icon="heart"
        mode="contained"
        //onPress={() => storeData({title,content,image_url})} 
        onPress={() => storeData({
          title, content, image_url,
          language: ''
        })} 
      >Save</Button>
  })

  return (
    <CardDetails content={content} image_url={image_url} title={title} />
  )
}

export default NewsOverview