import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function SignInScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>Sign IN</Text>
    </ScrollView>
  );
}

SignInScreen.navigationOptions = {
  title: 'Sing In',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
