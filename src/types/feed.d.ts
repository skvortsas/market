declare global {
  interface IFeedItem {
    id: string;
    name: string;
    description?: string;
    price: number;
    images: Array<UserPhoto>;
  }

  interface UserPhoto {
    filepath: string;
    webviewPath?: string;
  }
}

export {};
