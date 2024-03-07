//@ts-expect-error: unexpected error
import { type PercentCrop } from 'react-image-crop';

type CanvasProperties = {
    image: HTMLImageElement;
    canvas: HTMLCanvasElement;
    crop: PercentCrop;
    scale: number;
};

const canvasPreview = ({
    image,
    canvas,
    crop,
    scale = 1,
}: CanvasProperties): void => {
    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const pixelRatio = window.devicePixelRatio;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    context.scale(pixelRatio, pixelRatio);
    context.imageSmoothingQuality = 'high';

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;

    context.save();

    context.translate(-cropX, -cropY);
    context.translate(centerX, centerY);
    context.scale(scale, scale);
    context.translate(-centerX, -centerY);

    context.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
    );

    context.restore();
};

export { canvasPreview };
