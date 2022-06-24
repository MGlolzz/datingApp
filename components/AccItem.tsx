import React from "react";
import { Text, View,TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { AccountT } from "../types";
import styles, { DARK_GRAY, WHITE } from "../assets/styles";
type Props = {
  
  editSummary: () => void;
  editBackground: () => void;
  editLifeStyle: () => void;
  editBasic: () => void;
  editDating: () => void;
  
  name:AccountT,
  summary:AccountT,
  firstDate:AccountT,
  age:AccountT,
  state:AccountT,
  education:AccountT,
  ethnicity:AccountT,
  income:AccountT,
  job:AccountT,
  religion:AccountT,
  speaks:AccountT,
  diet:AccountT,
  drinks:AccountT,
  drugs:AccountT,
  offspring:AccountT,
  pets:AccountT,
  smokes:AccountT,
  gender:AccountT,
  status:AccountT,
  orientation:AccountT,
  bodyType:AccountT,
  height:AccountT,
  sign:AccountT,

};

const AccItem = (props:Props) => {
  const{
    age,
    summary,
    orientation,
    status,
    height,
    name,
    firstDate,
    state,
    education,
    ethnicity,
    income,
    job,
    religion,
    speaks,
    diet,
    drinks,
    drugs,
    offspring,
    pets,
    smokes,
    gender,
    bodyType,
    sign,
    editSummary,
    editBackground,
    editLifeStyle,
    editBasic,
    editDating,
  }=props;
  return(
  <View style={styles.containerProfileItem}>
    <View style={styles.titleAccItem}>
      <Text style={styles.matchesTextProfileItem}>
        <Icon name="ios-eye" size={13} color={WHITE} /> Personal Profile
      </Text>
    </View>

    <Text style={styles.name}>{name}</Text>

    <Text style={styles.descriptionProfileItem}>
      {age} - {state}
    </Text>

    <View style={styles.info}>
      <Text style={styles.accProfile}>
        Summary:
        
        
      </Text>
      <Text
       style={styles.infoContent}>{summary}</Text>
      <TouchableOpacity style={styles.editButton} onPress={editSummary}>
        <Icon name="md-color-wand-sharp" size={20} color={WHITE} />
      </TouchableOpacity>
    </View>

    <View style={styles.info}>
      <Text style={styles.accProfile}>
        Background
        :
      </Text>
      <Text style={styles.infoContent}>highest education level is {education}, {ethnicity} ethnicity, earning {income}, related to {job} industry,  religion is {religion}, speaks {speaks}</Text>
      <TouchableOpacity style={styles.editButton} onPress={editBackground}>
        <Icon name="md-color-wand-sharp" size={20} color={WHITE} />
      </TouchableOpacity>
    </View>

    <View style={styles.info}>
      <Text style={styles.accProfile}>
        LifeStyle:
      </Text>
      <Text style={styles.infoContent}>{diet} diet, {drinks} drinks, {drugs} have drugs, offspring preference is {offspring}, pet preference is {pets}, {smokes} smokes</Text>
      <TouchableOpacity style={styles.editButton} onPress={editLifeStyle}>
        <Icon name="md-color-wand-sharp" size={20} color={WHITE} />
      </TouchableOpacity>
    </View>

    <View style={styles.info}>
      <Text style={styles.accProfile}>
        Basic Information:
      </Text>
      <Text style={styles.infoContent}>{gender}, {orientation}, {status}, {bodyType}, {height}cm, {sign}</Text>
      <TouchableOpacity style={styles.editButton} onPress={editBasic}>
        <Icon name="md-color-wand-sharp" size={20} color={WHITE} />
      </TouchableOpacity>
    </View>

    <View style={styles.info}>
      <Text style={styles.accProfile}>
        Dating location: 
      </Text>
      <Text style={styles.infoContent}>{firstDate}</Text>
      <TouchableOpacity style={styles.editButton} onPress={editDating}>
        <Icon name="md-color-wand-sharp" size={20} color={WHITE} />
      </TouchableOpacity>
    </View>

  </View>
  );
};

export default AccItem;
