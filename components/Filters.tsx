import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import styles, { DARK_GRAY,PRIMARY_COLOR } from "../assets/styles";
type Props = {
  saveFilter: () => void;
};
const Filters = ({ saveFilter }: Props) => (
  <TouchableOpacity style={styles.filters}
  onPress= {saveFilter}>
    <Text style={[styles.filtersText,{color: PRIMARY_COLOR}]}>
      <Icon name="filter" size={13} color={PRIMARY_COLOR} /> Filters
    </Text>
  </TouchableOpacity>

);

export default Filters;
