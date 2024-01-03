import { useState } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
export function usePhotoGallery() {
  const [pictures, setPictures] = useState<UserPhoto[]>([]);

  const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
    // let base64Data: string | Blob;
    // // "hybrid" will detect Cordova or Capacitor;
    // if (isPlatform('hybrid')) {
    //   const file = await Filesystem.readFile({
    //     path: photo.webPath!,
    //   });
    //   base64Data = file.data;
    // } else {
    //   base64Data = await base64FromPath(photo.webPath!);
    // }
    // const savedFile = await Filesystem.writeFile({
    //   path: fileName,
    //   data: base64Data,
    //   directory: Directory.Data,
    // });

    if (isPlatform('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: photo.webPath!,
        webviewPath: Capacitor.convertFileSrc(photo.webPath!),
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  };

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const fileName = Date.now() + '.jpeg';
    const savedFileImage = await savePicture(photo, fileName);
    const newPhotos = [savedFileImage, ...pictures];
    setPictures(newPhotos);
  };

  const pickPictures = async () => {
    const pickedPictures = await Camera.pickImages({
      quality: 100,
    });
    const fileNames = pickedPictures.photos.map((p) => {
      if (p.path) {
        return p.path.substring(p.path.lastIndexOf('/') + 1);
      }
      return p.webPath.substring(p.webPath.lastIndexOf('/') + 1) + '.jpeg';
    });
    const photos: Array<Photo> = pickedPictures.photos.map((p) => {
      return {
        webPath: p.path ?? p.webPath,
        format: p.format,
        saved: false,
      };
    });
    const savedFileImages = await Promise.all(photos.map((p, i) => savePicture(p, fileNames[i])));
    const newPhotos = [...savedFileImages, ...pictures];
    setPictures(newPhotos);
  };

  const deletePicture = async (photo: UserPhoto) => {
    const restPictures = pictures.filter((p) => p.filepath !== photo.filepath);

    const filename = photo.filepath.substring(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });
    setPictures(restPictures);
  };

  return {
    pictures,
    takePhoto,
    pickPictures,
    deletePicture,
  };
}

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('method did not return a string'));
      }
    };
    reader.readAsDataURL(blob);
  });
}
