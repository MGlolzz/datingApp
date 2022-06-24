import React ,{useState,useEffect} from "react";
import {FlatList, Text, View,ImageBackground} from 'react-native';
import firebase from "firebase/compat";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { City, Filters, CardItem,FilterPop } from "../components";
import Swiper from "react-native-deck-swiper";
import tw from 'twrnc';
import styles from "../assets/styles";
import { Navigation } from '../type';
import { render } from "react-dom";

type Props = {
  navigation: Navigation;
};

const loadUsers = ({navigation}:Props) => {
    const [profile,setProfile]=useState<any[]>([]);
     const [swiper, setSwiper] = useState<CardStack | null>(null);
     const[size,setSize] = useState(0);
    useEffect(()=>{


    firebase.firestore().collection('users')
    .get()
    .then((querySnapshot) => {
        let temp = [];
        console.log('Total users: ', querySnapshot.size);
        setSize(querySnapshot.size);
        querySnapshot.forEach((snapshot) => {
            console.log('user Id: ', snapshot.id);
            let userDetails = {};
            userDetails = snapshot.data();
            userDetails['id'] = snapshot.id;
            temp.push(userDetails);
            
        })
        setProfile(temp);
    });

    

    
    
  },[]);

  if(profile.length==size){
        return (
             <ImageBackground
      source={require("../assets/background_dot.png")}
      style={styles.bg}
    >
      <View style={styles.containerHome}>
        <View style={styles.top}>
          <City />
          <Filters />
          <FilterPop/>
        </View>
        <CardStack
                loop
                verticalSwipe={false}
                renderNoMoreCards={() => null}
                ref={(newSwiper): void => setSwiper(newSwiper)}
                onSwipedLeft={()=>{
                    console.log('left');
                }}
                onSwipedRight={()=>{
                    console.log('right');
                }}
                >
            {
                profile.map((item)=>{

                return (
                    

                <Card key={item.name}>
                <CardItem
                    hasActions
                    image={item.profilePic}
                    name={item.name}
                    age={item.age}
                    summary={item.summary}
                    matches={item.match}
                    orientation={item.orientation}
                    status={item.status}
                    height={item.height}
                    />
                </Card>
                
            )


            })
            
        }

        </CardStack>

    </View>
    </ImageBackground>
  );
    }else{
        return(
            <View></View>
        );
    }

//       function itemView(profile){
//           profile.map((item)=>{

//         return (

//         <Card key={item.name}>
//         <CardItem
//             hasActions
//             image={item.profilePic}
//             name={item.name}
//             age={item.age}
//             summary={item.summary}
//             matches={item.match}
//             orientation={item.orientation}
//             status={item.status}
//             height={item.height}
//             />
//         </Card>

//     )


//       })
    
//   };

  

};



export default loadUsers;