import React, {Component} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {openWeatherMapAPI} from '../../assets/data/index';
import {connect} from 'react-redux';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      lat: '',
      lon: '',
      currentLoc: null,
      isLoading: false,
    };
  }

  componentWillMount() {
    this.refreshData();
  }

  refreshData = () => {
    Geolocation.getCurrentPosition(info => {
      this.getDataWeatherFromCoord(info.coords.latitude, info.coords.longitude);
      this.setState({
        lat: info.coords.latitude,
        lon: info.coords.longitude,
      });
    });
  };

  openDetail = () => {
    this.props.navigation.navigate('DetailScreen', {
      currentLoc: this.state.currentLoc,
    });
  };

  getDataWeatherFromCoord = async (lat, lon) => {
    try {
      this.setState({isLoading: true});
      let api = openWeatherMapAPI(lat, lon);
      let result = await axios.get(`https://${api}`);
      if (result) {
        this.setState({currentLoc: result.data, isLoading: false});
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: 'https://www.seekpng.com/png/detail/410-4100831_rainy-day-background-weather-and-climate-background.png',
          }}
          resizeMode="cover"
          style={styles.currentWeather}>
          <Text>
            {this.state.currentLoc
              ? `Current Location : ${this.state.currentLoc.name}`
              : null}
          </Text>
          <TouchableOpacity
            style={styles.loadMore}
            onPress={() => this.openDetail()}>
            <Text style={styles.textButton}>Load More</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loadMore}
            onPress={() => this.refreshData()}>
            <Text style={styles.textButton}>Refresh</Text>
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.wrapperMap}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: this.state.lat,
              longitude: this.state.lon,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            zoomEnabled={true}
            maxZoomLevel={11}>
            {this.props.marker && this.props.marker.length > 0
              ? this.props.marker.map(value => (
                  <MapView.Marker
                    coordinate={value.coordinates}
                    title={value.title}
                  />
                ))
              : null}
          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentWeather: {
    flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  wrapperMap: {
    flex: 0.7,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#b7bdb9',
    shadowColor: '#000000',
    elevation: 5,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    borderRadius: 5,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  coordinate: {
    flexDirection: 'row',
  },
  loadMore: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '30%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
    borderWidth: 3,
    borderColor: 'white',
    marginTop: 5,
  },
  textButton: {
    color: 'white',
  },
});

const mapStateToProps = state => {
  let {marker} = state.common;
  return {
    marker: marker,
  };
};
export default connect(mapStateToProps)(Dashboard);
