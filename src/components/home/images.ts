export const images = Array.from({ length: 50 }, (_, i) => ({
    original: `/images/originals/image_${1000 + i}.jpg`,
    thumbnail: `/images/thumbnails/thumbnail_${1000 + i}.jpg`,
    description: `Image Description ${1000 + i}`,
}));

export const get10RandomItems = () => {
    const shuffledImages = images.slice().sort(() => 0.5 - Math.random());
    return shuffledImages.slice(0, 10);
};
