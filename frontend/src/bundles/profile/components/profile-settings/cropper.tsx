/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-named-as-default */
import 'react-image-crop/dist/ReactCrop.css';

import { useCallback, useRef, useState } from 'react';
import type Crop from 'react-image-crop';
import type PercentCrop from 'react-image-crop';
import ReactCrop from 'react-image-crop';
import makeAspectCrop from 'react-image-crop';
import centerCrop from 'react-image-crop';

import { Button } from '~/bundles/common/components/components.js';

import { canvasPreview } from './canvas-preview.js';

const DIMENSION = {
    aspectRatio: 1,
    min: 25,
};

const Cropper = ({
    closeModal,
    image,
    getImgCropped,
}: {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
    image: string;
    getImgCropped: (img: string) => void;
}): JSX.Element => {
    const [crop, setCrop] = useState<Crop>();
    const [scale, setScale] = useState(1);
    const imgReference = useRef<HTMLImageElement>(null);
    const canvasReference = useRef<HTMLCanvasElement>(null);

    const handleCrop = useCallback((crop: PercentCrop) => {
        setCrop(crop);
    }, []);

    const onImageLoad = useCallback(
        (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const { width, height } = event.currentTarget;
            const crop = centerCrop(
                makeAspectCrop(
                    {
                        unit: '%',
                        width: DIMENSION.min,
                    },
                    DIMENSION.aspectRatio,
                    width,
                    height,
                ),
                width,
                height,
            );
            setCrop(crop);
        },
        [],
    );

    const onZoom = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setScale(Number.parseFloat(event.target.value));
    }, []);

    const setCanvasPreview = useCallback(() => {
        canvasPreview({
            crop,
            scale,
            canvas: canvasReference.current as HTMLCanvasElement,
            image: imgReference.current as HTMLImageElement,
        });

        const imgUrl = canvasReference.current?.toDataURL() as string;
        getImgCropped(imgUrl);
        closeModal(false);
    }, [crop, imgReference, canvasReference, scale, getImgCropped, closeModal]);

    return (
        <>
            <ReactCrop
                crop={crop}
                onChange={handleCrop}
                circularCrop
                keepSelection
                aspect={DIMENSION.aspectRatio}
            >
                <img
                    ref={imgReference}
                    src={image}
                    alt="avatar"
                    onLoad={onImageLoad}
                    style={{ transform: `scale(${scale})` }}
                />
            </ReactCrop>
            <div className="m-auto my-3 w-full">
                <p className="text-center font-semibold text-white">Zoom</p>
                <input
                    type="range"
                    className="accent-lm-yellow-100 w-full"
                    min={0.1}
                    max={4}
                    step={0.05}
                    value={scale}
                    onChange={onZoom}
                />
            </div>
            <Button
                size="sm"
                variant="secondary"
                label="Crop avatar"
                onClick={setCanvasPreview}
            />
            {crop && (
                <canvas
                    ref={canvasReference}
                    className="border-lm-yellow-100 m-auto mt-5 hidden h-[9.375] w-[9.375rem] border object-contain"
                />
            )}
        </>
    );
};

export { Cropper };
