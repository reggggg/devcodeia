import React, {Component} from 'react';

import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';


import '../../css/landingPage/Location.css';

class Location extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }


  render(){
    return (
      <div className="location" id="location">
        <div className="locationContent">
          <Map center={[14.55168406, 121.02436066]}
               zoom={15}
               height={400}
               maxZoom={16}
               minZoom ={13}
               className="map"
          >
            <Marker anchor={[14.555343, 121.01396765]}
                    payload={1}
                    width={70}
                    className="marker"
                    onClick={({ event, anchor, payload }) => {}}
            />
          </Map>
        </div>
      </div>
    );
  }
}
export default Location;
