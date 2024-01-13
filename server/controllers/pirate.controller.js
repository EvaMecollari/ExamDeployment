const Pirate = require('../models/pirate.model')

module.exports.createPirate = (req, res) => {
    if (req.body.position === 'Captain') {

        Pirate.findOne({ position: 'Captain' })
            .then(pirate => {
                if (pirate) {
                    return res.status(400).json({ errors: { position: { message: "There Is a Captain Already" } }})                
                }
                else {
                    Pirate.create(req.body)
                        .then(pirate => res.json(pirate))
                        .catch(err => res.status(400).json(err))
                }
            })
    }
    else {
        Pirate.create(req.body)
            .then(pirate => res.json(pirate))
            .catch(err => res.status(400).json(err))
    }
}

module.exports.displayAll = (req, res) => {
    Pirate.find({}).sort({name:'asc'})
    .then(pirates => res.json(pirates))
    .catch(err => res.json(err))
}

module.exports.displayOne = (req, res) => {
    Pirate.findOne({_id: req.params.id})
        .then(pirate => res.json(pirate))
        .catch(err => res.json(err))
}

module.exports.deletePirate = (req, res) => {
    Pirate.deleteOne({_id: req.params.id})
        .then(deletedPirate => res.json(deletedPirate))
        .catch(err => res.json(err))
}


module.exports.editPirate = (req, res) => {
    Pirate.findOne({ _id: req.params.id })
        .then(pirate => {
            if (!pirate) {
                return res.status(404).json({ error: "Pirate not found" });
            }
            pirate.name = req.body.name || pirate.name;
            pirate.img = req.body.img || pirate.img;
            pirate.treasureChest = req.body.treasureChest || pirate.treasureChest;
            pirate.catchPhrase = req.body.catchPhrase || pirate.catchPhrase;
            pirate.position = req.body.position || pirate.position;
            pirate.pegLeg = req.body.pegLeg !== undefined ? req.body.pegLeg : pirate.pegLeg;
            pirate.eyePatch = req.body.eyePatch !== undefined ? req.body.eyePatch : pirate.eyePatch;
            pirate.hookHand = req.body.hookHand !== undefined ? req.body.hookHand : pirate.hookHand;

            return pirate.save();
        })
        .then(updatedPirate => {
            res.json(updatedPirate);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};
function normalizeError(err, req, res, next) {
   
    res.status(err.status || 500).json({
      error: {
        code: err.code || 'INTERNAL_SERVER_ERROR',
        message: err.message || 'Internal Server Error',
        details: err.details || null
      }
    });
  }
  

  
