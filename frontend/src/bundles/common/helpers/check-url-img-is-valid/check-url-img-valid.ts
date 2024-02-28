const isValidUrlImg = (url: string): boolean => {
    const img = new Image();
    img.src = url;
    return img.complete;
};

export { isValidUrlImg };