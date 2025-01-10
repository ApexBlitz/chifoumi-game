import { motion } from 'framer-motion'
import { RockingChairIcon as Rock, PaperclipIcon as Paper, Scissors } from 'lucide-react'


const GameCard = ({ choice, isRevealed }) => {
  const getIcon = () => {
    switch (choice) {
      case 'rock':
        return <Rock size={48} />
      case 'paper':
        return <Paper size={48} />
      case 'scissors':
        return <Scissors size={48} />
      default:
        return null
    }
  }

  return (
    <motion.div
      className="w-40 h-56 bg-white rounded-lg shadow-lg flex items-center justify-center"
      initial={false}
      animate={{ rotateY: isRevealed ? 0 : 180 }}
      transition={{ duration: 0.6 }}
    >
      {isRevealed ? (
        getIcon()
      ) : (
        <div className="text-4xl font-bold text-gray-300">?</div>
      )}
    </motion.div>
  )
}

export default GameCard






