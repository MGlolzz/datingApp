import React from "react";
import { Text, View } from "react-native";
import Icon from "./Icon";
import { ProfileItemT } from "../types";
import styles, { WHITE } from "../assets/styles";

const ProfileItem = ({
  matches,
  name,
  summary,
  firstDate,
  age,
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
  status,
  orientation,
  bodyType,
  height,
  sign,
}: ProfileItemT) => (
  <View style={styles.containerProfileItem}>
    <View style={styles.matchesProfileItem}>
      <Text style={styles.matchesTextProfileItem}>
        <Icon name="heart" size={13} color={WHITE} /> {matches}% Similarity
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
    </View>

    <View style={styles.info}>
      <Text style={styles.accProfile}>
        Background
        :
      </Text>
      <Text style={styles.infoContent}>highest education level is{education}, {ethnicity}, earning {income}, related to {job} industry, {religion}, speaks {speaks}</Text>
    </View>

    <View style={styles.info}>
      <Text style={styles.accProfile}>
        LifeStyle:
      </Text>
      <Text style={styles.infoContent}>{diet}, drinks {drinks}, {drugs} have drugs, offspring preference is {offspring}, pet preference is {pets}, {smokes} smokes</Text>
    </View>

    <View style={styles.info}>
      <Text style={styles.accProfile}>
        Basic Information:
      </Text>
      <Text style={styles.infoContent}>{gender}, {orientation}, {status}, {bodyType}, {height}cm, {sign}</Text>
    </View>

    <View style={styles.info}>
      <Text style={styles.accProfile}>
        Dating location: 
      </Text>
      <Text style={styles.infoContent}>{firstDate}</Text>
    </View>

  </View>
);

export default ProfileItem;
