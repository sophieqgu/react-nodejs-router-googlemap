import React, {Component} from 'react';
import { POS_KEY } from '../constants';

import {
   withScriptjs,
   withGoogleMap,
   GoogleMap,
} from "react-google-maps";

class NormalAroundMap extends Component {
   render() {
       const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
       return (
           <GoogleMap
               ref={this.getMapRef}
               defaultZoom={11}
               defaultCenter={{ lat, lng: lon }}
           >

           </GoogleMap>
       );
   }
}

const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));

export default AroundMap;
