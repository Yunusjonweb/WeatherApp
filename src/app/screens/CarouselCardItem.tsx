import moment from 'moment';
import {VStack} from 'native-base';
import React from 'react';
import {Image, Text, StyleSheet, Dimensions} from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width + 40;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.4);

const CarouselCardItem = ({item, index}) => {
  return (
    <VStack
      space="5px"
      style={styles.container}
      key={index}
      alignItems="center">
      <Image
        style={styles.tinyLogo}
        source={{uri: 'https:' + item?.day?.condition?.icon}}
        alt="weather icon"
      />
      <Text style={styles.nameDays}>{moment(item?.date).format('dddd')}</Text>
      <Text style={styles.dataTitle}>{item?.day?.avgtemp_c}&#176;</Text>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  tinyLogo: {
    width: 80,
    height: 80,
  },
  nameDays: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
  },
  dataTitle: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },
});

export default CarouselCardItem;
