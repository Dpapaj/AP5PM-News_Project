//@ts-nocheck

import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Appbar, Chip, Button,useTheme, ProgressBar, MD3Colors } from 'react-native-paper'
import { ComponentNavigationProps, NewsData } from '../Utilities/Types'
import CardItem from '../Components/CardItem'
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer'


const categories=["Technology","Sports","Food","Science","Health"]
const API_KEY = "add_key"

const Home = (props: ComponentNavigationProps) => {
  const [newsData, setnewsData] = useState<NewsData[]>([])
  const theme = useTheme();
  const [selectedCategories, setselectedCategories] = useState([])
  const [nextPage, setnextPage] = useState("")
  const [isLodaing, setisLodaing] = useState(false)

  const handleSelect = (val:string)=>{
    setselectedCategories((prev:string[])=>prev.find(p=>p===val)?prev.filter((cat)=>cat!==val) :[...prev,val]);
  };
  const handlePress =async()=>{
    const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=cz,gb,us&language=en${selectedCategories.length > 0 ? `&category=${selectedCategories.join()}`: ""}
    ${nextPage?.length>0 ? `&page=${nextPage}` : " "}`;

    //console.log(URL);
    try{
      setisLodaing(true)
      await fetch(URL).then((res)=>res.json()).then((data)=>{
        setnewsData((prev)=>[...prev, ...data.results])
        setnextPage(data.nextPage)
    });
    setisLodaing(false)
    }catch(err){
      console.log(err)
    } 
  };
  console.log(newsData);


  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home">
        </Appbar.Content>
      </Appbar.Header>
      <View style={styles.filterContainer}>
        {categories.map((cat)=><Chip key={cat} mode='outlined' style={styles.chipItem} textStyle={{fontWeight:"400", color:"white",padding:1}}
        showSelectedOverlay
        selected={selectedCategories.find((c)=>cat===c) ? true:false }
        onPress={()=>handleSelect(cat)}>
         {cat} 
        </Chip>)}
        <Button mode="elevated" style={styles.button} labelStyle={{fontSize:14, margin:"auto", color:theme.colors.primary}} icon={"sync"} onPress={(handlePress)}>
          Refresh
        </Button>
      </View>
      <ProgressBar color={MD3Colors.error50} indeterminate visible={isLodaing} />
      <FlatList keyExtractor={(Item)=>Item.title} onEndReached={()=>handlePress()}
      style={styles.flatlist} data={newsData} renderItem={({item})=>
      <CardItem navigation={props.navigation} content={item.content}  description={item.description} image_url={item.image_url} title={item.title} />}/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  filterContainer:{
    flexDirection:'row',
    flexWrap: "wrap",
    marginVertical:10,
  },
  chipItem:{
    marginHorizontal:5,
    marginVertical:5,
  },
  button:{
    maxWidth:400,
    padding:0,
    maxHeight:40,
  },
  flatlist:{
    flex:1,
    height:"auto",
  },
})
