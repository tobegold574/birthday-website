"use client"
// 优化后的祝福信组件
import Button from "@/components/shared/Button";

const BirthdayLetter = ({ score, onClose }) => {
    const wish = {
        title: "致最亲爱的你",
        content: `今天是你的20岁生日，
    看着你成功接住了${score}个蛋糕，我忍不住想说：
    你永远像初升的太阳一样，温暖而充满希望。
    愿你的20岁，被温柔以待，
    愿所有的美好，都能如约而至。
    愿你永远保持那份纯真和热爱，
    愿你遇见的所有时光，都恰到好处。
    
    生日快乐！`,
        from: "最爱你的朋友"
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-lg bg-[#FFF8F0] p-6 rounded-xl shadow-xl transform transition-all">
                {/* 装饰元素 */}
                <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-[#FF9B50] rounded-tl-lg" />
                <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-[#FF9B50] rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-[#FF9B50] rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-[#FF9B50] rounded-br-lg" />

                <div className="relative z-10 px-6">
                    {/* 标题 */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-medium text-[#FF9B50] mb-1">
                            {wish.title}
                        </h2>
                    </div>

                    {/* 分隔线 */}
                    <div className="flex items-center justify-center my-4">
                        <div className="h-px bg-[#FFB072] w-16" />
                        <span className="mx-3 text-[#FF9B50]">✦</span>
                        <div className="h-px bg-[#FFB072] w-16" />
                    </div>

                    {/* 祝福内容 */}
                    <div className="bg-white/50 backdrop-blur-sm p-5 rounded-lg shadow-sm">
                        <p className="text-[#E25E3E] whitespace-pre-line leading-relaxed">
                            {wish.content}
                        </p>
                        <p className="text-right text-[#FF9B50] font-medium mt-4">
                            —— {wish.from}
                        </p>
                    </div>

                    {/* 关闭按钮 */}
                    <div className="text-center mt-6">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-[#FF9B50] text-white rounded-full hover:bg-[#E25E3E] transition-colors duration-300"
                        >
                            收下祝福
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BirthdayLetter;