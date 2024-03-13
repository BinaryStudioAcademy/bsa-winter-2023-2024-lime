const toBlob = (canvas: HTMLCanvasElement | null): Promise<Blob | null> => {
    return new Promise((resolve) => {
        canvas && canvas.toBlob(resolve);
    });
};

const toFile = async (
    canvas: React.RefObject<HTMLCanvasElement>,
): Promise<File> => {
    const blob = (await toBlob(canvas.current)) as Blob;
    return new File([blob], 'image', {
        type: 'image/webp',
    });
};

export { toFile };
