import Compressor from 'compressorjs';

// 画像ファイルを圧縮する関数
export const compressImage = (file: File) => {
  return new Promise((resolve, reject) => {
    // 最大ファイルサイズ(bytes)を指定する。この値を超えるファイルは JPEG に変換される
    const maxSizeInBytes = 1 * 1024 * 1024; // =1MB in bytes

    // 圧縮する
    new Compressor(file, {
      quality: 0.8,
      convertSize: maxSizeInBytes,
      maxWidth: 512,
      success(result: any) {
        console.log('Original file size:', file.size / 1024, 'KB');
        console.log('Compressed file size:', result.size / 1024, 'KB');
        console.log('Compressed image width:', result.width, 'px');
        resolve(result);
      },
      error(err: any) {
        reject(err);
      },
    });
  });
};
