declare global {
  interface IFeedItem {
    id: string;
    name: string;
    description?: string;
    price: number;
    images: Array<string>;
  }

  interface IFeed {
    items: Array<IFeedItem>;
  }
}

export {};
