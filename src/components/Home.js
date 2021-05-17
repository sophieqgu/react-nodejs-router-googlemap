import React, { Component } from 'react';
import { Tabs, Button, Spin, Row, Col } from 'antd';
import Gallery from './Gallery';

import {
   GEO_OPTIONS,
   POS_KEY,
   API_ROOT,
   AUTH_HEADER,
   TOKEN_KEY,
   POST_TYPE_IMAGE,
   POST_TYPE_VIDEO,
   POST_TYPE_UNKNOWN,
} from '../constants';


const { TabPane } = Tabs;

class Home extends Component {
    state = {
      isLoadingGeoLocation: false,
      isLoadingPosts: false,
      error: '',
      posts: [],
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
      this.loadNearbyPosts();
    }


    onFailedLoadGeoLocation = () => {
      this.setState({ isLoadingGeoLocation: false, error: 'Failed to load geo location.' });
    }

    loadNearbyPosts = () => {
      const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
      const token = localStorage.getItem(TOKEN_KEY);
      this.setState({ isLoadingPosts: true, error: '' });
      fetch(`${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20000`, {
        method: 'GET',
        headers: { Authorization: `${AUTH_HEADER} ${token}` }
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to load post.');
      })
      .then((data) => {
        console.log(data);
        this.setState({ posts: data ? data : [], isLoadingPosts: false });
      })
      .catch((e) => {
        console.error(e);
        this.setState({ isLoadingPosts: false, error: e.message });
      });
    }

    renderPosts = () => {
      const { isLoadingGeoLocation, isLoadingPosts, error, posts } = this.state;
      if (error) {
        return error;
      } else if (isLoadingGeoLocation) {
          return <Spin tip="Loading geo location..."/>;
      } else if (isLoadingPosts) {
          return <Spin tip="Loading posts..."/>
      } else if (posts.length > 0) {
          return type === POST_TYPE_IMAGE ? this.renderImagePosts() : this.renderVideoPosts();
      } else {
          return "No nearby posts";
      }
    }

    renderImagePosts = () => {
      const { posts } = this.state;
      const images = posts
         .filter((post) => post.type === POST_TYPE_IMAGE)
         .map((post) => {
             return {
                 user: post.user,
                 src: post.url,
                 thumbnail: post.url,
                 caption: post.message,
                 thumbnailWidth: 400,
                 thumbnailHeight: 300,
             };
         });
      return <Gallery images={images}/>
    }

    renderVideoPosts = () => {

    }



    render() {

      const operations = <Button type="primary">Create New Post</Button>;

      return (
        <Tabs tabBarExtraContent={operations} className="main-tabs">
          <TabPane tab="Image Post" key="1">
            {this.renderImagePosts()}
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
