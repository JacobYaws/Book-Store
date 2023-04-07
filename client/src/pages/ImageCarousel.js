// import React, { Component } from 'react';
// import Slider from 'react-slick';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// //Need to add images instead of placeholders

// export default class SimpleSlider extends Component {
//   render() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1
//   };

//   return (
//     <Slider {...settings}>
//       <div>
//         <img src="https://via.placeholder.com/800x300" alt="Slide 1" />
//       </div>
//       <div>
//         <img src="https://via.placeholder.com/800x300" alt="Slide 2" />
//       </div>
//       <div>
//         <img src="https://via.placeholder.com/800x300" alt="Slide 3" />
//       </div>
//     </Slider>
//   );
// };
// };

import React, { Component } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//Need to add images instead of placeholders

export default class SimpleSlider extends Component {
  render() {
    
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div>
        <img style={{marginLeft: '43.5%'}} src="https://upload.wikimedia.org/wikipedia/en/7/7b/The_Giver_first_edition_1993.jpg" alt="Slide 1" />
      </div>
      <div>
        <img style={{marginLeft: '42%'}} src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1385297074i/50.jpg" alt="Slide 2" />
      </div>
      <div>
        <img style={{marginLeft: '43%'}} src="https://upload.wikimedia.org/wikipedia/en/d/d7/FlushNovel.jpg" alt="Slide 3" />
      </div>
    </Slider>
  );
};
};