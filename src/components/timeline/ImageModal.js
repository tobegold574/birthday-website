// 在Timeline.js中添加ImageModal组件
import Timeline from "@/components/timeline/Timeline";

const ImageModal = ({ image, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* 关闭按钮 */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            {/* 图片容器 */}
            <div
                className="relative max-w-7xl max-h-[90vh] w-full h-full"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={image.url}
                    alt={image.title || '预览图片'}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                />
            </div>
        </div>
    );
};
export default ImageModal;