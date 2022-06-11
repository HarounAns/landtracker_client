import { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export interface IFeedPostCarouselProps {
    photos: string[];
}

export function FeedPostCarousel({ photos }: IFeedPostCarouselProps) {
    // load the first images in the size that is best for them, subsequent images should match their size
    const firstImageStyle = { width: "100%", objectFit: 'contain' };
    const [subsequentImageStyle, setSubsequentImageStyle] = useState({});


    const onImgLoad = ({ target: img }: { target: any; }, i: number) => {
        if (i !== 0) return;
        setSubsequentImageStyle({ height: img.offsetHeight, width: img.offsetWidth });
    };

    return (
        <Carousel
            showIndicators={false}
            showThumbs={false}>
            {photos.map((photo, i) => (
                <div>
                    <img
                        onLoad={(e) => onImgLoad(e, i)}
                        style={i === 0 ? firstImageStyle : subsequentImageStyle}
                        src={photo}
                        alt={`Carousel ${i}`}
                    />
                </div>
            ))}
        </Carousel>
    );
}
