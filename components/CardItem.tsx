import React,{useEffect,useState} from "react";
import { Text, View, Image, Dimensions, TouchableOpacity,ImageBackground } from "react-native";
import Icon from "./Icon";
import { CardItemT } from "../types";
import styles, {
  DISLIKE_ACTIONS,
  
  LIKE_ACTIONS,
  
  WHITE,
} from "../assets/styles";
type Props = {
  pressLike: () => void;
  pressDislike: () => void;
  age: CardItemT,
  summary: CardItemT,
   orientation: CardItemT,
  status: CardItemT,
  height: CardItemT,
  hasActions: CardItemT,
  hasVariant: CardItemT,
  image: CardItemT,
  matches: CardItemT,
  name: CardItemT,

};
const CardItem =(props:Props)=>  {
    //decompose
  const{
  age,
  summary,
   orientation,
  status,
  height,
  hasActions,
  hasVariant,
  image,
  matches,
  name,
  }=props;
  // Custom styling
  const fullWidth = Dimensions.get("window").width;
  const fullHeight = Dimensions.get("window").height;
  const imageStyle = [
    {
      borderRadius: 8,
      width: hasVariant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: hasVariant ? 170 : 350,
      margin: hasVariant ? 0 : 20,
    },
  ];

  const nameStyle = [
    {
      paddingTop: true ? 10 : 15,
      paddingBottom: true ? 5 : 7,
      color: "#363636",
      fontSize: true ? 15 : 30,
    },
  ];
  const homeCart=[
  {
      fontFamily:'sans-serif-medium',
      width:!hasVariant?230:100,
      paddingTop:!hasVariant?20:0,
    }
  ];
  const containerStyle =[
    {
      height: hasVariant ?fullHeight*1/3:fullHeight*4/5,
    }
  ]

  return (
    <View style={[styles.containerCardItem,containerStyle]}>
      {/* IMAGE */}
      <ImageBackground source={{uri:image}} style={imageStyle}/>

      {matches && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
            <Icon name="heart" color={WHITE} size={13} /> {matches}% Similarity!
          </Text>
        </View>
      )}


      <Text style={nameStyle}>{name}</Text>

      
        <Text style={styles.descriptionCardItem}>{age}-{orientation}, {status}, {height}</Text>

          <Text style={[styles.descriptionCardItem, homeCart]}>{summary}</Text>      

      {hasActions && (
              <View style={styles.actionsCardItem}>
              

                <TouchableOpacity style={styles.button} >
                  <Icon name="heart" color={LIKE_ACTIONS} size={25} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} >
                  <Icon name="close" color={DISLIKE_ACTIONS} size={25} />
                </TouchableOpacity>

                
              </View>
      )}
    </View>
  );
};

export default CardItem;
