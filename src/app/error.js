'use client'

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">哎呀，出错了</h2>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
        >
          重试
        </button>
      </div>
    </div>
  )
}