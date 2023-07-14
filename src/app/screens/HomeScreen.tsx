import React, {useState} from 'react';
import {HStack, Input, Pressable, SearchIcon, VStack, View} from 'native-base';
import {Text, Image} from 'react-native';
import WeatherBg from '../../assets/images/bg.png';
import PageWrapper from '../components/PageWrapper';
import {StyleSheet} from 'react-native';
import {fetchLocations, fetchWeatherForecast} from '../api';
import Carousel from 'react-native-snap-carousel';
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItem';

const dataA = [
  {
    title: 'Aenean leo',
    body: 'Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
    imgUrl: 'https://picsum.photos/id/11/200/300',
  },
  {
    title: 'In turpis',
    body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
    imgUrl: 'https://picsum.photos/id/10/200/300',
  },
  {
    title: 'Lorem Ipsum',
    body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: 'https://picsum.photos/id/12/200/300',
  },
];

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [datas, setDatas] = useState([]);
  const isCarousel = React.useRef(null);

  const handleSearch = () => {
    if (search && search.length > 2)
      fetchLocations({cityName: search}).then(data => {
        setData(data);
        yunus();
      });
  };

  const yunus = () => {
    fetchWeatherForecast({cityName: search, days: 'Monday'}).then(data => {
      setDatas(data);
    });
  };

  console.log(datas, 654549659);

  return (
    <PageWrapper backgroundImage={WeatherBg}>
      <VStack justifyContent="space-between" height="100%" paddingTop="0px">
        <VStack space="40px" mt="50" alignItems="center">
          <HStack justifyContent="space-between" alignItems="center">
            <Input
              type="text"
              width={'90%'}
              placeholder="Search country"
              onChangeText={text => setSearch(text)}
              InputRightElement={
                <Pressable onPress={() => handleSearch()}>
                  <SearchIcon size="lg" style={{margin: 24, color: 'white'}} />
                </Pressable>
              }
            />
          </HStack>
          <HStack space="10px">
            <Text style={styles.countryName}>{data?.location?.country}</Text>
            <Text style={styles.cityName}>{data?.location?.name}</Text>
          </HStack>
          <Image
            style={styles.tinyLogo}
            source={{uri: 'https:' + data.current?.condition?.icon}}
            alt="icon"
          />
          <VStack space="20px" alignItems="center">
            <Text style={styles.tempCelsius}>
              {data?.current?.temp_c}&#176;
            </Text>
            <Text style={styles.tempCondition}>
              {data?.current?.condition?.text}
            </Text>
          </VStack>
          <HStack
            space="25px"
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
              {data?.location?.localtime.slice(-5)}AM
            </Text>
          </HStack>
          <HStack space="25px" justifyContent="flex-end" alignItems="center">
            <Text>Daily forecast</Text>
          </HStack>
          <View>
            <Carousel
              layout="default"
              layoutCardOffset={3}
              ref={isCarousel}
              data={dataA}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              inactiveSlideShift={0}
              useScrollView={true}
            />
          </View>
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
    fontWeight: '600',
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
    fontWeight: '400',
    color: 'white',
  },
  weatherCard: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
