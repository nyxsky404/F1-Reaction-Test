import { useState, useRef } from 'react'

function App() {
  const [gameState, setGameState] = useState("waiting")
  const [reactionTime, setReactionTime] = useState(null)
  const [bestTime, setBestTime] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [showInstructions, setShowInstructions] = useState(true)
  const timerRef = useRef(null)

  const startGame = () => {
    setGameState("red")
    setReactionTime(null)
    setStartTime(null)
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }    

    setTimeout(() => {
      setGameState("yellow")
      setTimeout(() => {
        setGameState("ready")
        setStartTime(Date.now())
      }, 1000 + Math.random() * 3000)
    }, 1000)
  }

  const handleClick = () => {
    if (gameState === "ready" && startTime) {
      const time = Date.now() - startTime
      setReactionTime(time)
      setBestTime(prev => prev === null || time < prev ? time : prev)
      setGameState("done")
    } else if (gameState === "red" || gameState === "yellow") {
      if (timerRef.current) clearTimeout(timerRef.current)
      setGameState("falseStart")
    }
  }

  const resetGame = () => {
    setGameState("waiting")
    setReactionTime(null)
  }

  const getBackgroundColor = () => {
    switch (gameState) {
      case "red":
        return "bg-red-500"
      case "yellow":
        return "bg-yellow-400"
      case "ready":
        return "bg-green-500"
      case "falseStart":
        return "bg-red-600"
      case "waiting":
        return "bg-blue-400"
      case "done":
        return "bg-purple-500"
      default:
        return "bg-gray-200"
    }
  }

  const getMessage = () => {
    switch (gameState) {
      case "waiting":
        return "Click Start to begin!"
      case "red":
        return "Wait..."
      case "yellow":
        return "Get Ready..."
      case "ready":
        return "CLICK NOW!"
      case "done":
        return (
        <div className="space-y-2">
          <div className="text-3xl">Your time:</div>
          <div className="text-4xl font-bold text-yellow-300">{reactionTime}ms</div>
        </div>
      )
      case "falseStart":
        return "False Start! 🚫"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative">
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl max-w-md mx-4 shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-3xl mr-3">🏎️</span>
              How to Play
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 text-white">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                <p className="mt-1">Click "Start Game" to begin your F1 reaction challenge!</p>
              </div>
              <div className="flex items-start space-x-4 text-white">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                <p className="mt-1">Watch for the red light and stay focused...</p>
              </div>
              <div className="flex items-start space-x-4 text-white">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                <p className="mt-1">When you see green, click as fast as you can!</p>
              </div>
              <div className="flex items-start space-x-4 text-white">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">⚠️</div>
                <p className="mt-1">But be careful! Clicking too early means a false start!</p>
              </div>
            </div>
            <button
              onClick={() => setShowInstructions(false)}
              className="mt-8 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       transition-colors duration-150 font-semibold"
            >
              Let's Race! 🏁
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-4xl font-bold text-center text-white mb-8 flex items-center justify-center">
          <span className="text-5xl mr-4">🏎️</span>
          F1 Reaction Test
        </h1>

        <div 
          onClick={handleClick}
          className={`
            ${getBackgroundColor()}
            w-full h-64 rounded-xl shadow-lg
            flex items-center justify-center
            cursor-pointer transition-colors duration-150
            text-2xl font-bold text-white
          `}
        >
          {getMessage()}
        </div>

        <div className="flex justify-center">
          {(gameState === "waiting" || gameState === "done" || gameState === "falseStart") && (
            <button
              onClick={startGame}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       transition-colors duration-150 font-semibold"
            >
              {gameState === "waiting" ? "Start Game" : "Try Again"}
            </button>
          )}
        </div>

        {bestTime !== null && (
          <div className="text-center text-white">
            <p className="text-xl">Best Time: <span className="text-yellow-300 font-bold">{bestTime}ms</span></p>
          </div>
        )}

        <button
          onClick={() => setShowInstructions(true)}
          className="absolute top-4 right-4 px-4 py-2 bg-gray-800 text-white rounded-lg 
                   hover:bg-gray-700 transition-colors duration-150 flex items-center"
        >
          <span className="mr-2">ℹ️</span>
          Instructions
        </button>
      </div>
    </div>
  )
}

export default App