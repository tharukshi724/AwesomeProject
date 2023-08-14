import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Marker from './Marker';

function App(): JSX.Element {
  const [markers, setMarkers] = useState<Array<{x: number; y: number}>>([]);
  const [clickedCoordinate, setClickedCoordinate] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleMarkerMove = (index: number, dx: number, dy: number) => {
    const updatedMarkers = [...markers];
    updatedMarkers[index] = {
      x: markers[index].x + dx,
      y: markers[index].y + dy,
    };
    setMarkers(updatedMarkers);
  };

  const handleImageClick = (event: {
    nativeEvent: {locationX: number; locationY: number};
  }) => {
    const relativeX = event.nativeEvent.locationX;
    const relativeY = event.nativeEvent.locationY;

    const newMarker = {x: relativeX, y: relativeY};
    setClickedCoordinate(newMarker);
    setMarkers([...markers, newMarker]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImageClick} activeOpacity={1}>
        <Image
          style={styles.image}
          source={require('./human1.jpg')}
          resizeMode="contain"
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            index={index}
            x={marker.x}
            y={marker.y}
            onMove={(index, dx, dy) => handleMarkerMove(index, dx, dy)}
          />
        ))}
        {clickedCoordinate && (
          <View
            style={[
              // styles.indicator,
              {left: clickedCoordinate.x, top: clickedCoordinate.y},
            ]}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 600,
    height: 600,
  },
  marker: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  // indicator: {
  //   position: 'absolute',
  //   width: 20,
  //   height: 20,
  //   borderRadius: 10,
  //   borderColor: 'blue',
  //   borderWidth: 2,
  // },
});

export default App;
