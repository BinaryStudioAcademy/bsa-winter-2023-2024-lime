import 'react-image-crop/dist/ReactCrop.css';

import { useCallback, useRef, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import ReactCrop, {
    //@ts-expect-error: it does not let me commit changes
    type Crop,
    //@ts-expect-error: it does not let me commit changes
    type PercentCrop,
    //@ts-expect-error: it does not let me commit changes
    centerCrop,
    //@ts-expect-error: it does not let me commit changes
    makeAspectCrop,
} from 'react-image-crop';

import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { Button } from '~/bundles/common/components/components.js';
import { useAppDispatch } from '~/bundles/common/hooks/hooks.js';

import { canvasPreview } from './canvas-preview.js';

function toBlob(canvas: HTMLCanvasElement | null): Promise<Blob | null> {
    return new Promise((resolve) => {
        canvas && canvas.toBlob(resolve);
    });
}

const DIMENSION = {
    aspectRatio: 1,
    min: 25,
};

const Cropper = ({
    closeModal,
    image,
}: {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
    image: string | null;
}): JSX.Element => {
    const [crop, setCrop] = useState<Crop>();
    const [scale, setScale] = useState(1);
    const imgReference = useRef<HTMLImageElement>(null);
    const canvasReference = useRef<HTMLCanvasElement>(null);

    const dispatch = useAppDispatch();

    const toFile = useCallback(async (): Promise<void> => {
        const blob = (await toBlob(canvasReference.current)) as Blob;
        const imgPayload = new File([blob], 'image', {
            type: 'image/webp',
        });

        void dispatch(authActions.upload(imgPayload));
    }, [dispatch]);

    const handleCrop = useCallback((PercentCrop: PercentCrop) => {
        setCrop(PercentCrop);
    }, []);

    const onImageLoad = useCallback(
        (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const { width, height } = event.currentTarget;
            const imgCrop: Crop = makeAspectCrop(
                {
                    unit: '%',
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

    const setCanvasPreview = useCallback(() => {
        canvasPreview({
            crop,
            scale,
            canvas: canvasReference.current as HTMLCanvasElement,
            image: imgReference.current as HTMLImageElement,
        });

        void toFile();

        closeModal(false);
    }, [crop, imgReference, canvasReference, scale, closeModal, toFile]);

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
