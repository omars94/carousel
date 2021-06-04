import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const getOrientation = () => {
  {
    if (width < height) {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }
};
