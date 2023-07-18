import React, {useRef, useState, useEffect} from 'react';
import moment from 'moment';
import {Text, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import WeatherBg from '../../assets/images/bg.png';
import PageWrapper from '../components/PageWrapper';
import {fetchLocations, fetchWeatherForecast} from '../api';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {HStack, Input, Pressable, SearchIcon, VStack} from 'native-base';
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItem';

const HomeScreen = () => {
  const isCarousel = useRef(null);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    defaultWeather();
  }, []);

  const handleSearch = () => {
    if (search && search.length > 2)
      fetchLocations({cityName: search}).then(data => {
        setData(data);
        weekDays();
      });
    setSearch('');
  };

  const weekDays = () => {
    return fetchWeatherForecast({
      cityName: search,
      days: 7,
    }).then(docs => {
      setWeekData(docs?.forecast?.forecastday);
    });
  };

  const defaultWeather = () => {
    fetchLocations({cityName: 'Uzbekistan'}).then(data => {
      setData(data);
    });
    fetchWeatherForecast({
      cityName: 'Uzbekistan',
      days: 7,
    }).then(docs => {
      setWeekData(docs?.forecast?.forecastday);
    });
  };

  return (
    <PageWrapper backgroundImage={WeatherBg}>
      <VStack justifyContent="space-between" height="100%" paddingTop="0px">
        <VStack space="25px" mt="50" alignItems="center">
          <HStack justifyContent="space-between" alignItems="center">
            <Input
              type="text"
              width={'90%'}
              placeholder="Search country..."
              onChangeText={text => setSearch(text)}
              InputRightElement={
                <Pressable onPress={() => handleSearch()}>
                  <SearchIcon size="lg" style={{margin: 24, color: 'white'}} />
                </Pressable>
              }
            />
          </HStack>
          <HStack space="10px" alignItems="center">
            <Icon name="location-arrow" color="white" size={30} />
            <Text style={styles.countryName}>{data?.location?.country}</Text>
            <Text style={styles.cityName}>{data?.location?.name}</Text>
          </HStack>
          <VStack space="10px" alignItems="center">
            <Image
              style={styles.tinyLogo}
              source={{uri: 'https:' + data.current?.condition?.icon}}
              alt="icon"
            />
            <Text style={styles.tempCelsius}>
              {data?.current?.temp_c}&#176;
            </Text>
            <Text style={styles.tempCondition}>
              {data?.current?.condition?.text}
            </Text>
          </VStack>
          <HStack
            space="15px"
            justifyContent="space-between"
            alignItems="center">
            <Image
              style={styles.windLogo}
              source={require('../../assets/icons/wind.png')}
            />
            <Text style={styles.dataTitle}>{data?.current?.wind_kph}km</Text>
            <Image
              style={styles.windLogo}
              source={require('../../assets/icons/drop.png')}
            />
            <Text style={styles.dataTitle}>{data?.current?.humidity}%</Text>
            <Image
              style={styles.windLogo}
              source={require('../../assets/icons/sun.png')}
            />
            <Text style={styles.dataTitle}>
              {moment(data?.location?.localtime).format('LTS')}
            </Text>
          </HStack>
          <HStack space="15px" justifyContent="flex-end" alignItems="center">
            <Icon name="calendar" color="white" size={20} />
            <Text style={styles.dataTitle}>Daily forecast</Text>
          </HStack>
          <Carousel
            layout="default"
            layoutCardOffset={3}
            ref={isCarousel}
            data={weekData}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideShift={0}
            useScrollView={true}
            autoplay={true}
            autoplayDelay={2000}
            loop={true}
          />
        </VStack>
      </VStack>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  countryName: {
    fontSize: 22,
    fontWeight: '400',
    color: 'white',
  },
  cityName: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  tinyLogo: {
    width: 180,
    height: 180,
    objectFit: 'cover',
  },
  windLogo: {
    width: 30,
    height: 30,
  },
  input: {
    width: '80%',
    margin: 20,
  },
  tempCelsius: {
    fontSize: 50,
    fontWeight: '900',
    color: 'white',
  },
  tempCondition: {
    fontSize: 22,
    fontWeight: '400',
    color: 'white',
  },
  dataTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
  },
  weatherCard: {
    width: 180,
    height: 180,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
