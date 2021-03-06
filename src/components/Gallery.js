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
    const images = this.props.images.map((image) => {
       return {
           ...image,
           customOverlay: (
               <div className="gallery-thumbnail">
                   <div>{`${image.user}: ${image.caption}`}</div>
               </div>
           ),
       };
    });

    return (
       <div>
         <div className="gallery">
             <GridGallery
                 backdropClosesModal
                 images={images}
                 enableImageSelection={false}/>
         </div>
       </div>
    );
  }
}
export default Gallery;
