import { useEffect, useState } from 'react';

const GIPHY_KEY = process.env.REACT_APP_GIPHY_KEY;
const queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=`;

export type Gifs = Item[];

interface Item {
  images: {
    preview: {
      mp4: string;
    };
  };
}

export function useGiphy(query: string) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getGif() {
      try {
        setLoading(true);
        const response = await fetch(`${queryUrl}${query}`);
        const json = await response.json();

        setResults(json.data.map((item: Item) => item.images.preview.mp4));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (query !== '') {
      getGif();
    }
  }, [query]);

  return [results, loading];
}
