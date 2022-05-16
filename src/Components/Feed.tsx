import React, { useState, useEffect } from 'react';
import { FeedPost } from './FeedPost';
import { Button, Container, Spinner } from 'reactstrap';
import { GetUserFeedApiResponse, NextKey, ZillowItem } from '../types';
import axios from 'axios';
import { LANDTRACKER_API_URL, USERNAME } from '../config';
import FeedNavbar from './FeedNavbar';

const getFeed = async (key: any): Promise<GetUserFeedApiResponse> => {
  const url = (
    Boolean(key.length)
      ?
      `${LANDTRACKER_API_URL}/users/${USERNAME}/feed?nextKey=${key}`
      :
      `${LANDTRACKER_API_URL}/users/${USERNAME}/feed`
  );
  const res: GetUserFeedApiResponse = await axios.get(url);

  // remove duplicates
  return res;
}

const Feed: React.FunctionComponent = () => {
  const [items, setItems] = useState<ZillowItem[]>([]);
  const [originalItems, setOriginalItems] = useState<ZillowItem[]>([]);
  const [nextPageKey, setNextPageKey] = useState<NextKey>();
  const [loadingNextPage, setLoadingNextPage] = useState<boolean>(false);

  useEffect(() => {
    const loadInitialPage = async () => {
      const { data: { feed, nextKey } }: GetUserFeedApiResponse = await getFeed('');

      // remove duplicates based on zpid
      const uniqueFeed: ZillowItem[] = [];
      const zpids: string[] = [];
      for (const feedPost of feed) {
        if (zpids.includes(feedPost.zpid)) continue;
        zpids.push(feedPost.zpid);
        uniqueFeed.push(feedPost);
      }

      setItems(uniqueFeed);
      setOriginalItems(uniqueFeed);
      setNextPageKey(nextKey);
    }

    loadInitialPage();
  }, []);

  useEffect(() => {
    const handleScroll = async () => {
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 5) return;
      if (!nextPageKey) {
        console.debug('No items left');
        return;
      }

      if (loadingNextPage) return;
      setLoadingNextPage(true);

      const { data: { feed, nextKey } }: GetUserFeedApiResponse = await getFeed(encodeURIComponent(JSON.stringify(nextPageKey)));
      const uniqueFeed: ZillowItem[] = [];
      const zpids: string[] = [];
      for (const item of items) {
        if (zpids.includes(item.zpid)) continue;
        zpids.push(item.zpid);
        uniqueFeed.push(item);
      }
      for (const feedPost of feed) {
        if (zpids.includes(feedPost.zpid)) continue;
        zpids.push(feedPost.zpid);
        uniqueFeed.push(feedPost);
      }

      setItems(uniqueFeed);
      setOriginalItems(uniqueFeed);
      setNextPageKey(nextKey);
      setLoadingNextPage(false);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextPageKey]);

  return (
    <>
      <FeedNavbar
        originalItems={originalItems}
        items={items}
        setItems={setItems} />
      {items.map(item => <FeedPost item={item} />)}
      {loadingNextPage && (
        <Container style={{ textAlign: 'center' }}>
          <Spinner color='light' size='sm' />
        </Container>
      )}
      {!loadingNextPage && !nextPageKey && Boolean(items.length) && (
        <Container style={{ textAlign: 'center', color: 'white' }}>
          No more items
        </Container>
      )}
    </>
  );
};

export default Feed;
