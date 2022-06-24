import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import styles, { DARK_GRAY } from "../assets/styles";

type Props = {
  state: string;
};
const City = ({state}:Props) => (
  <TouchableOpacity style={styles.city}>
    <Text style={styles.cityText}>
        <Icon name="location-sharp" size={13} color={DARK_GRAY} />{state}
    </Text>
  </TouchableOpacity>
);

export default City;
