import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import { connect } from 'react-redux'
import LoginTab from './LoginTab'
import RegisterTab from './RegisterTab'
import Colors from '../../constants/Colors'

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

  render () {
    return (
      <View style={styles.container}>
        <TabView
          navigationState={this.state}
          renderTabBar={props => (
            <TabBar {...props} style={{ backgroundColor: '#666' }} />
          )}
          renderScene={({ route }) => {
            switch (route.key) {
              case 'login':
                return <LoginTab {...this.props} />
              case 'register':
                return <RegisterTab {...this.props} />
              default:
                return null
            }
          }}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      </View>
    )
  }
}

export default connect(state => ({
  // loading: state.general.loading,
}))(AuthScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.pageBackground,
  },
})
