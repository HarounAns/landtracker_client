import { ZillowItem } from '../types';
import { FeedPostCarousel } from './FeedPostCarousel';
import FeedHeader from './FeedHeader';
import { FeedText } from './FeedText';

const NO_IMAGE_AVAILABLE_URL = 'https://panthertech.fiu.edu/scs/extensions/SC/Manor/3.3.0/img/no_image_available.jpeg?resizeid=105&resizeh=1200&resizew=1200';


export interface IFeedPostProps {
    item: ZillowItem;
}

export function FeedPost({ item }: IFeedPostProps) {
    const {
        photos,
        SK: createdTs
    } = item;

    return (
        <div style={{ marginBottom: "50px" }}>
            <FeedHeader createdTs={createdTs} />
            {photos?.length ? <FeedPostCarousel photos={photos} /> : <img src={NO_IMAGE_AVAILABLE_URL} />}
            <FeedText item={item} />
        </div>
    );
}
