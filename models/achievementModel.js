import mongoose from 'mongoose'

const AchievementSchema = new mongoose.Schema(
  {
    description: String,
    //uh mb later
    status: {
      type: String,
      enum: ['inactive', 'activated', 'complete'],
      default: 'inactive',
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
