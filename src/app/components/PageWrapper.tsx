import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {ScrollView} from 'native-base';
import {colors} from '../theme/variables';

interface IPageWrapperProps {
  children: any;
  bg?: string;
  paddingH?: number | string;
  height?: string | number;
  safeAreaViewColor?: string;
  backgroundImage?: any | null;
}

const PageWrapper = ({
  children,
  bg,
  paddingH,
  height,
  safeAreaViewColor,
  backgroundImage,
}: IPageWrapperProps) => {
  return (
    <ImageBackground
      imageStyle={{height: backgroundImage ? '140%' : '100%'}}
      style={{flex: 1}}
      source={backgroundImage}
      resizeMode="cover"
      blurRadius={70}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: !backgroundImage
            ? safeAreaViewColor || colors.white[100]
            : null,
        }}>
        <ScrollView
          bg={!backgroundImage ? bg ?? 'white.100' : null}
          showsVerticalScrollIndicator={false}
          maxHeight={height}
          style={[styles.scrollView, {paddingHorizontal: paddingH ?? 18}]}>
          <View style={styles.wrapper}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  wrapper: {
    flex: 1,
    minHeight: Dimensions.get('window').height - 90,
  },
});

export default PageWrapper;
