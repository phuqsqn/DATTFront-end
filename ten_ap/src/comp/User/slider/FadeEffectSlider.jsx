import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "500px",
};

const fadeImages = [
  {
    url: "https://adsplus.vn/wp-content/uploads/2018/12/nguyen-tac-thiet-ke-banner-pham-dep-ngat-ngay-08-1.jpg" ,
    caption: "First Slide",
  },
  {
    url: "https://topprint.vn/wp-content/uploads/2021/07/banner-my-pham-dep-12-1024x390.png",
    caption: "Second Slide",
  },
  {
    url: "https://intphcm.com/data/upload/banner-my-pham-uu-dai.jpg",
    caption: "Third Slide",
  },
];

const FadeSlideshow = () => {
  return (
    <div className="slide-container">
      <Fade duration={2000}>
        {fadeImages.map((fadeImage, index) => (
          <div key={index} style={{ ...divStyle }}>
            <img style={{ width: "100%" }} src={fadeImage.url} />
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default FadeSlideshow;
