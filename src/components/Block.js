import React from 'react';
import {
  FlatList,
  View,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getOrientation} from '@helpers';

export function Block(props) {
  const insets = useSafeAreaInsets();
  const isLandscape = getOrientation() === 'landscape';
  let {item, index, blocksPerSlide} = props;
  let blockStyle = styles.blockStyle(blocksPerSlide);

  return (
    <View
      style={[
        blockStyle,
        {
          borderRadius: 10,
          overflow: 'hidden',
          marginHorizontal: 2.5,
          height: blockStyle.height + 50,
          width: isLandscape ? blockStyle.width - 5 : blockStyle.width - 5,
        },
      ]}>
      <Image
        style={[
          blockStyle,
          {
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            width: isLandscape ? blockStyle.width - 5 : blockStyle.width - 5,
          },
        ]}
        resizeMode="cover"
        source={{uri: item.showPicture}}
      />
      <View
        style={{
          borderWidth: 1,
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: 10,
          height: 50,
          borderTopEndRadius: 0,
          borderTopStartRadius: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'rgba(0,0,0,0.7)'}}>{item.title}</Text>
      </View>
    </View>
  );
}

const styles = {
  blockStyle: (blocksPerSlide, index, total) => {
    const insets = useSafeAreaInsets();
    const isLandscape = getOrientation() === 'landscape';
    let {width, height} = Dimensions.get('window');
    width = width - insets.right - insets.left;
    return {
      width:
        isLandscape && blocksPerSlide
          ? width / blocksPerSlide
          : blocksPerSlide
          ? width / blocksPerSlide
          : width,
      height:
        blocksPerSlide && blocksPerSlide > 1 ? width / blocksPerSlide : height,
    };
  },
};
