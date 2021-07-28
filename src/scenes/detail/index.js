import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import {saveToMarkerGlobal} from '../../redux/actions/common';

class Detail extends Component {
  constructor(props) {
    super();
    this.state = {
      currentLoc: null,
    };
  }

  componentDidMount() {
    this.setState({currentLoc: this.props.route.params.currentLoc});
  }

  saveToMarker = (name, lat, lon) => {
    let latestData = [];
    if (this.props.marker) {
      latestData = this.props.marker;
    }
    let currentData = {
      title: name,
      coordinates: {
        latitude: lat,
        longitude: lon,
      },
    };
    latestData.push(currentData);
    this.props.dispatch(saveToMarkerGlobal(latestData));
    ToastAndroid.show("Save successfully !", ToastAndroid.SHORT);

  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: 'https://www.seekpng.com/png/detail/410-4100831_rainy-day-background-weather-and-climate-background.png',
          }}
          resizeMode="cover"
          style={styles.currentWeather}>
          <Text>Your Current Coordinate :</Text>
          <View style={styles.coordinate}>
            <Text>
              {this.state.currentLoc
                ? `( Lat : ${this.state.currentLoc.coord.lat}, Lon: ${this.state.currentLoc.coord.lon} )`
                : null}
            </Text>
          </View>
          <Text>
            {this.state.currentLoc
              ? `Current Location : ${this.state.currentLoc.name}`
              : null}
          </Text>
          <Text>
            {this.state.currentLoc
              ? `Weather : ${this.state.currentLoc.weather[0].description}`
              : null}
          </Text>
          <Text>
            {this.state.currentLoc
              ? `Temperature : ${this.state.currentLoc.main.temp}F`
              : null}
          </Text>
          <Text>
            {this.state.currentLoc
              ? `Humidity : ${this.state.currentLoc.main.humidity}`
              : null}
          </Text>
          <TouchableOpacity
            style={styles.loadMore}
            onPress={() =>
              this.saveToMarker(
                this.state.currentLoc.name,
                this.state.currentLoc.coord.lat,
                this.state.currentLoc.coord.lon,
              )
            }>
            <Text style={styles.textButton}>Save to Marker</Text>
          </TouchableOpacity>
        </ImageBackground>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
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

export default connect(mapStateToProps)(Detail);
