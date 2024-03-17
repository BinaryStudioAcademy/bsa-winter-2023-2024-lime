import { motion } from 'framer-motion';

type Properties = {
    x: number;
    className?: string;
    children?: JSX.Element | JSX.Element[];
};

const Fade: React.FC<Properties> = ({
    x,
    className,
    children,
}): JSX.Element => {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, x: x },
                visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
            initial="hidden"
            whileInView="visible"
        >
            {children}
        </motion.div>
    );
};

export { Fade };
