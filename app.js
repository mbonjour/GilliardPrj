'use strict';
var configs = require('./configs')(require('path').join(__dirname, 'configs/configs.json'));
var store = require('epfl-enac-gilliarddb')(configs.db);
var acquisition = require('./acquisition')(configs.logging);

configs.acquisitionSys.boards.map(function (board) {
    acquisition.listen(board, function (acquisitionData) {
        acquisitionData.acquisitionSysId = configs.acquisitionSys.secret;
        store.repository.insertSensorValue({
            models: store.models,
            configs: configs,
            acquisitionData: acquisitionData,
            currentBoard: board
        });
    });
});

