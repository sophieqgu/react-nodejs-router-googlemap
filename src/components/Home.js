import React, { Component } from 'react';
import { Tabs, Button } from 'antd';
import { GEO_OPTIONS, POS_KEY, API_ROOT, AUTH_HEADER, TOKEN_KEY } from '../constants';

const { TabPane } = Tabs;

class Home extends Component {
    state = {
      isLoadingGeoLocation: false,
      error: ''
    }
    componentDidMount() {
      console.log(navigator.geolocation);
      if ("geolocation" in navigator) {
        this.setState({ isLoadingGeoLocation: true, error: ''});
        navigator.geolocation.getCurrentPosition(
           this.onSuccessLoadGeoLocation,
           this.onFailedLoadGeoLocation,
           GEO_OPTIONS,
        );
      } else {
         this.setState({ error: 'Geolocation is not supported.'});
      }
    }

    onSuccessLoadGeoLocation = (position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      localStorage.setItem(POS_KEY, JSON.stringify({ lat: latitude, lon: longitude }));
      this.setState({ isLoadingGeoLocation: false, error: '' });
    }


    onFailedLoadGeoLocation = () => {
      this.setState({ isLoadingGeoLocation: false, error: 'Failed to load geo location.' });
    }


    render() {

      const operations = <Button type="primary">Create New Post</Button>;

      return (
        <Tabs tabBarExtraContent={operations} className="main-tabs">
          <TabPane tab="Image Post" key="1">
          Content of tab 1
          </TabPane>
          <TabPane tab="Video Post" key="2">
          Content of tab 2
          </TabPane>
          <TabPane tab="Map" key="3">
          Content of tab 3
          </TabPane>
        </Tabs>
      );
   }
}

export default Home;
