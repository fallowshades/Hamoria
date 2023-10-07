import mongoose from 'mongoose'

const AchievementSchema = new mongoose.Schema(
  {
    description: String,
    //uh mb later
    Status: {
      type: String,
      enum: ['inactive', 'activated', 'complete'],
      default: 'pending',
    },
    points: {
      type: Number,
      default: 0,
    },

    type: {
      type: String,
      enum: [
        'progressive',
        'exploration',
        'time-based',
        'skill-based',
        'social',
        'collection',
        'storyline',
        'event',
        'hidden',
        'lifetime',
      ],
      required: true,
      default: 'exploration',
    },
    dateOfCompletion: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
)

export default mongoose.model('achievement', AchievementSchema)
