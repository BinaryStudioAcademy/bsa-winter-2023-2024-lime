//@ts-expect-error: unexpected error
import { type PercentCrop } from 'react-image-crop';

type CanvasProperties = {
    image: HTMLImageElement;
    canvas: HTMLCanvasElement;
    crop: PercentCrop;
    scale: number;
};

export { type CanvasProperties };
