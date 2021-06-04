import React, {useState} from 'react';
import {FlatList, View, Pressable, Text, Dimensions} from 'react-native';
import {Block} from '@components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getOrientation} from '@helpers';
const {width, height} = Dimensions.get('window');

export default function Carousel(props) {
  const {blocksPerSlide, blocks} = props;
  const insets = useSafeAreaInsets();
  const [pageNumber, setpageNumber] = useState(0);
  const [carousel, setCarouselRef] = useState(null);
  const isLandscape = getOrientation() == 'landscape';
  return (
    <View
      style={[
        styles.container,
        isLandscape
          ? {paddingRight: insets.right, paddingLeft: insets.left}
          : {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <View style={[styles.container, {flexDirection: 'row'}]}>
        <FlatList
          key={blocksPerSlide + ''}
          style={[
            {
              flex: 1,
            },
            styles.blockHeight(blocksPerSlide),
          ]}
          horizontal
          data={blocks}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
          ref={ref => setCarouselRef(ref)}
          scrollEnabled={false}
          renderItem={({item, index}) => {
            return (
              <Block
                blocksPerSlide={blocksPerSlide}
                item={item}
                index={index}
                key={index}
              />
            );
          }}
        />
        <Pressable
          hitSlop={5}
          style={[
            styles.nextPrevButton,
            {
              left: 0,
            },
            !(pageNumber >= blocksPerSlide) && styles.buttonDisabled,
          ]}
          disabled={!(pageNumber >= blocksPerSlide)}
          onPress={() => {
            let index = pageNumber - blocksPerSlide;
            if (index < 0) index = blocksPerSlide - 1;
            carousel && carousel.scrollToIndex({index, viewPosition: 0});
            setpageNumber(index);
          }}>
          <Text style={{color: 'white'}}>{'<'}</Text>
        </Pressable>
        <Pressable
          hitSlop={5}
          disabled={!(pageNumber < blocks.length - blocksPerSlide)}
          style={[
            styles.nextPrevButton,
            {
              right: 0,
            },
            !(pageNumber < blocks.length - blocksPerSlide) &&
              styles.buttonDisabled,
          ]}
          onPress={() => {
            let index = pageNumber + blocksPerSlide;
            if (index >= blocks.length - 1) index = blocks.length - 1;
            carousel && carousel.scrollToIndex({index});
            setpageNumber(index);
          }}>
          <Text style={{color: 'white'}}>{'>'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

Carousel.defaultProps = {
  blocksPerSlide: 4,
};

const styles = {
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  buttonDisabled: {opacity: 0},
  nextPrevButton: {
    borderWidth: 1,
    zIndex: 999999,
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockHeight: blocksPerSlide => ({
    height:
      (blocksPerSlide && blocksPerSlide > 1 ? width / blocksPerSlide : height) +
      50,
  }),
};
