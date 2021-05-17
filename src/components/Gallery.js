import React, {Component} from 'react';
import GridGallery from 'react-grid-gallery';
import PropTypes from 'prop-types';

class Gallery extends Component {

  static propTypes = {
     images: PropTypes.arrayOf(
         PropTypes.shape({
             user: PropTypes.string.isRequired,
             src: PropTypes.string.isRequired,
             thumbnail: PropTypes.string.isRequired,
             caption: PropTypes.string,
             thumbnailWidth: PropTypes.number.isRequired,
             thumbnailHeight: PropTypes.number.isRequired
         })
     ).isRequired
  }

  render() {
     return (
         <div>
             Gallery
         </div>
     );
  }
}
export default Gallery;
