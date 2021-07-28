import React, { Component } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import AppNavigator from './app-navigator';
import { Colors } from '../utils';
class RootStack extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Provider store={store}>
                    <PersistGate store={store} persistor={persistor}>
                        <StatusBar barStyle="light-content" backgroundColor={Colors.COLOR1} />
                        <AppNavigator />
                    </PersistGate>
                </Provider>
            </SafeAreaView>
        )
    }
}
export default RootStack;