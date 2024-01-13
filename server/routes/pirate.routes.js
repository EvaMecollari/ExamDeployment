const PirateController = require('../controllers/pirate.controller')

module.exports = app => {
    app.get('/api/pirates/', PirateController.displayAll)
    app.get('/api/pirate/:id/', PirateController.displayOne)
    app.post('/api/pirates/', PirateController.createPirate)
    app.delete('/api/pirate/:id', PirateController.deletePirate)
    app.patch('/api/pirates/:id', PirateController.editPirate);
}