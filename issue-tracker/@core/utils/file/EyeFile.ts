export class EyeFile {
  imageCompress({
    file,
    options,
  }: {
    file: File;
    options?: {
      width: number;
      minFileSizeForQuality?: number;
      quality?: number;
      imageType?: string;
      imageFormat?: string;
    };
  }): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      const isQualityReduce = options?.minFileSizeForQuality
        ? options?.minFileSizeForQuality < image.naturalWidth
        : false;
      image.src = window.URL.createObjectURL(file);
      image.onload = () => {
        canvas.width = Math.min(image.naturalWidth, options!.width);
        canvas.height =
          (image.naturalHeight / image.naturalWidth) * canvas.width;
        ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob: any) => {
            const myImage = new File(
              [blob],
              `${file.name.substring(0, file.name.lastIndexOf('.'))}.${
                options?.imageFormat || 'webp'
              }`,
              { type: blob.type }
            );
            resolve(myImage);
          },
          options?.imageType || 'image/webp',
          isQualityReduce ? options?.quality : 1
        );
      };
    });
  }

  convertBlobToBase64(blob: Blob) {
    return new Promise<any>((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}
