import multer from 'fastify-multer';

const storage = multer.memoryStorage();

const upload = multer({
    storage,
});

export { upload };
