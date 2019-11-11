import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { connect } from 'react-redux'
import LoginTab from './LoginTab'
import RegisterTab from './RegisterTab'

class AuthScreen extends React.Component {
  static navigationOptions = {
    title: 'Running Time',
  }

  state = {
    index: 0,
    routes: [
      { key: 'login', title: 'Login' },
      { key: 'register', title: 'Regiter' },
    ],
  }

  render() {
    return (
      <View style={styles.container}>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            login: () => <LoginTab {...this.props} />,
            register: () => <RegisterTab {...this.props} />,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      </View>
    )
  }
}

export default connect()(AuthScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
})
