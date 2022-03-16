const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const resultSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date: String,
    questions: [{
        questionType: String,
        question: {
            type: String,
            
        },
        options: [
            {
              type: String,
             
            }
        ],
        givenanswer: 
            {
                type: String,
               
            }
        
    
    }],
    collectionStartTime: String,
    collectionEndTime: String,
    infocollect: {
        type: Number,
        default: 0,
    },
    infocollectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'infoCollection',
    }
}, {
    timestamps: true
});

var Quizes = mongoose.model('survey', resultSchema);

module.exports = Quizes;

