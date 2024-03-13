import 'react-image-crop/dist/ReactCrop.css';

import { useCallback, useRef, useState } from 'react';
import {
    type Crop,
    type PercentCrop,
    centerCrop,
    makeAspectCrop,
    ReactCrop,
} from 'react-image-crop';

import { Button, Loader } from '~/bundles/common/components/components.js';
import { IconColor } from '~/bundles/common/components/icon/enums/enums.js';

import { canvasPreview } from './canvas-preview.js';
import { DIMENSION } from './enums/enums.js';
import { toFile } from './helpers/helpers.js';

type Properties = {
    onAvatarUpload: (file: File) => void;
    closeModal: () => void;
    isLoading: boolean;
    image: string | null;
};

const Cropper = ({
    onAvatarUpload,
    closeModal,
    isLoading,
    image,
}: Properties): JSX.Element => {
    const [crop, setCrop] = useState<Crop>();
    const [scale, setScale] = useState(1);
    const imgReference = useRef<HTMLImageElement>(null);
    const canvasReference = useRef<HTMLCanvasElement>(null);

    const handleCrop = useCallback(
        (percentCrop: PercentCrop) => {
            setCrop(percentCrop);
        },
        [setCrop],
    );

    const onImageLoad = useCallback(
        (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const { width, height } = event.currentTarget;
            const imgCrop: Crop = makeAspectCrop(
                {
                    unit: 'px',
                    width: DIMENSION.min,
                },
                DIMENSION.aspectRatio,
                width,
                height,
            );
            const center: Crop = centerCrop(imgCrop, width, height);
            setCrop(center);
        },
        [],
    );

    const onZoom = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setScale(Number.parseFloat(event.target.value));
    }, []);

    const handleClick = useCallback(async (): Promise<void> => {
        canvasPreview({
            crop,
            scale,
            canvas: canvasReference.current as HTMLCanvasElement,
            image: imgReference.current as HTMLImageElement,
        });

        if (canvasReference.current) {
            const imgPayload = await toFile(canvasReference);
            onAvatarUpload(imgPayload);
            void closeModal();
        }
    }, [
        crop,
        imgReference,
        canvasReference,
        scale,
        closeModal,
        onAvatarUpload,
    ]);

    return (
        <>
            <ReactCrop
                crop={crop}
                onChange={handleCrop}
                circularCrop
                keepSelection
                aspect={DIMENSION.aspectRatio}
                minWidth={50}
            >
                <img
                    ref={imgReference}
                    src={image ?? ''}
                    alt="avatar"
                    onLoad={onImageLoad}
                    style={{ transform: `scale(${scale})` }}
                />
            </ReactCrop>
            <div className="m-auto my-3 w-full">
                <p className="text-center font-semibold text-white">
                    Zoom In / Out
                </p>
                <input
                    type="range"
                    className="accent-lm-yellow-100 w-full"
                    min={0.5}
                    max={4}
                    step={0.05}
                    value={scale}
                    onChange={onZoom}
                />
            </div>
            <Button
                size="sm"
                variant="secondary"
                label="Upload image"
                onClick={handleClick}
                leftIcon={isLoading && <Loader color={IconColor.SECONDARY} />}
            />
            {crop && (
                <canvas
                    ref={canvasReference}
                    className="border-lm-yellow-100 m-auto mt-5 hidden h-[9.375rem] w-[9.375rem] border object-contain"
                />
            )}
        </>
    );
};

export { Cropper };
