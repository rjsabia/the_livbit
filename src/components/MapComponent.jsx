import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import { connect } from 'react-redux';
import { onMapMarkerEnter, onMapMarkerLeave } from '../actions';
import { API_Maps_KEY } from './secrets';
import MapStyleDark from './MapStyleDark.json';

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_Maps_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, width: `50%`, float: `right` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  console.log('props in googleMap', props);
  return (
    <GoogleMap
    defaultZoom={7}
    center={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
    defaultOptions={{ styles: MapStyleDark }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }} 
    onClick={props.onMarkerClick} />}
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.myVenues.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lon }}
          onClick={() => props.onMouseEnter(marker.id)}
          //onMouseOut={() => props.onMouseLeave()}
        > 
          {
            props.venueId === marker.id && props.isInfoWindowOpen ?
              <InfoWindow>
              <h2>{marker.name}</h2>
              </InfoWindow>
            :
              ''
          }
        </Marker>
      ))}
    </MarkerClusterer>
  </GoogleMap>
  )
}

);

class MapComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
    currentLocation: {
      lat: 37.774929,
      lng: -122.419416,
      markerClick: 'Users current location'
    }
  }

  componentDidMount() {

    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            this.setState({
                currentLocation: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
            })
        })
    }
    this.delayedShowMarker()
  }

  onMouseEnter = (id) => {
    this.props.onMapMarkerEnter(id);
  }

  onMouseLeave = () => {
    this.props.onMapMarkerLeave();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  mouseOnMarker = (mark) => {
    return <div><h2>{mark.name}</h2></div>
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        currentLocation={this.state.currentLocation}
        myVenues={this.props.myVenues}
        mouseOnMarker={this.mouseOnMarker}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        venueId={this.props.venueId}
        isInfoWindowOpen={this.props.isInfoWindowOpen}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    myVenues: state.venue.venues,
    venueId: state.venue.venueIdHovered,
    isInfoWindowOpen: state.venue.isInfoWindowOpen
  }
}

export default connect(mapStateToProps, { onMapMarkerEnter, onMapMarkerLeave })(MapComponent);