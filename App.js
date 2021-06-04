import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Carousel from './src/carousel';

const returnRandomNumber = () => Math.ceil(Math.random(0, 1) * 10);
const SERVER_URL = 'https://mocki.io/v1/67e0c4e4-41c9-4549-87a0-7c26541d5598';

export default function App(props) {
  const [blocks, setBlocks] = useState([]);
  useEffect(() => {
    fetch(SERVER_URL)
      .then(res =>
        res
          .json()
          .then(({data}) => {
            data.map(i => {
              let random = returnRandomNumber() % i.images.length;
              i.showPicture = i.images[random];
              return i;
            });
            setBlocks(data);
          })
          .catch(e => null),
      )
      .catch(e => null);
  }, []);

  return (
    <SafeAreaProvider>
      <Carousel blocks={blocks} blocksPerSlide={4} />
    </SafeAreaProvider>
  );
}
