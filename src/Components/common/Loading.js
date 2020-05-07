import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export const Loading = ({ size }) => {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size={size}/>
    </View>
  );
};

const styles = {
  spinnerContainer: {
    flex: -1,
    marginTop: 12,
    marginBottom: 12
  }
};