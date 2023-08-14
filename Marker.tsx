/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import Draggable from 'react-native-draggable';
import {View, StyleSheet} from 'react-native';

interface MarkerProps {
  index: number;
  x: number;
  y: number;
  onMove: (index: number, dx: number, dy: number) => void;
}

const Marker: React.FC<MarkerProps> = ({index, x, y, onMove}) => {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <Draggable
      x={x}
      y={y}
      minX={0}
      minY={0}
      maxX={600 - 10} 
      maxY={600 - 10} 
      onDrag={(event, changing) => {
        if (!isDragging) {
          setIsDragging(true);
        }
        onMove(index, changing.dx, changing.dy);
      }}
      onDragRelease={() => {
        setIsDragging(false);
      }}>
      <View
        style={[
          styles.marker,
          {backgroundColor: isDragging ? 'yellow' : 'red'},
        ]}
      />
    </Draggable>
  );
};

const styles = StyleSheet.create({
  marker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});
export default Marker;
