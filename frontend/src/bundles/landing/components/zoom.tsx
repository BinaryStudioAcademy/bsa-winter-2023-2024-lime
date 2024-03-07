import { motion } from 'framer-motion';

type Properties = {
    className?: string;
    children?: JSX.Element;
};

const Zoom = ({ className, children }: Properties): JSX.Element => {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 1, type: 'easeOut', delay: 0.3 }}
            initial="hidden"
            whileInView="visible"
        >
            {children}
        </motion.div>
    );
};

export { Zoom };
