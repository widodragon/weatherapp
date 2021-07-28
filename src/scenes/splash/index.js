import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {hp} from '../../utils/responsive';
import {Colors} from '../../utils';
import {CommonActions} from '@react-navigation/native';

class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{name: 'DashboardScreen'}],
      });
      this.props.navigation.dispatch(resetAction);
    }, 2000);
  }
  render() {
    return (
      <View style={style.container}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{width: hp(20), height: hp(30)}}
          resizeMode="stretch"
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
