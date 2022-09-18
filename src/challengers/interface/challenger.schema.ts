import mongoose from 'mongoose';

export const ChallengerSchema = new mongoose.Schema(
  {
    dateHourChallenger: { type: Date },
    status: { type: String },
    dateHourRequisition: { type: Date },
    dateHourResponse: { type: Date },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    category: { type: String },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  },
  { timestamps: true, collection: 'challengers' },
);
