/**
 * This is the controller file for the puzzle endpoint
 * This file is called by the router file and calls the service file
 * There are four main functions {@link createPuzzle}, {@link createGame},
 * {@link updatePuzzle}, and {@link removePuzzle}
 * The main purpose of the controller is to make sure that only validated and sanitized data
 * moves on to the service function
 * @module PuzzleController
 */

import {matchedData} from "express-validator";
import {CustomError, CustomErrorEnum} from "../models/error.model";

const puzzleService = require('../services/userActiveGamesBFF.service');


/**
 * Returns 200 if createGameService is successful
 * Otherwise catches error and sends to our errorHandler
 * Takes parameters and sends it to createGameService
 * @param req This is the request object
 * @param res This is the response object
 * @param next This takes us to the errorHandler if request fails
 */
async function createGame(req, res, next) {

    try {
        // if difficulty is not provided in parameters we throw error
        if (!('difficulty' in req.query)){
            throw new CustomError(CustomErrorEnum.STARTGAME_INVALIDDIFFICULTY, 400);
        }

        res.json(await puzzleService.createGameService(req.query['difficulty'], req));
    } catch(err) {
        next(err);
    }
}

/**
 * Returns 201 if puzzleService is successful
 * Otherwise catches error and sends to our errorHandler
 * Takes sanitized input and sends it to puzzleService
 * @param req This is the request object
 * @param res This is the response object
 * @param next This takes us to the errorHandler if request fails
 */
async function createPuzzle(req, res, next) {

    const allData = Object.values(matchedData(req, { locations: ['body'] }));
    // this is needed because the last element in matchedData array is the original request for some reason.
    // I believe this is a bug with express-validator relating to bodies that have arrays
    allData.pop();
    try {
        // override successful completion code of 200 to 201 for successful object creation
        res.status(201).json(await puzzleService.createPuzzle(allData));
    } catch(err) {
        next(err);
    }
}

/**
 * Returns 200 if puzzleService is successful
 * Otherwise catches error and sends to our errorHandler
 * Takes sanitized input and sends it to puzzleService
 * @param req This is the request object
 * @param res This is the response object
 * @param next This takes us to the errorHandler if request fails
 */
async function updatePuzzle(req, res, next) {

    const queryData = matchedData(req, { locations: ['query'] });
    const bodyData = matchedData(req, { locations: ['body'] });
    try {
        res.json(await puzzleService.updatePuzzle(bodyData, queryData));
    } catch(err) {
        next(err);
    }
}

/**
 * Returns 200 if puzzleService is successful
 * Otherwise catches error and sends to our errorHandler
 * Takes sanitized input and sends it to puzzleService
 * @param req This is the request object
 * @param res This is the response object
 * @param next This takes us to the errorHandler if request fails
 */
async function removePuzzle(req, res, next) {

    const allData = matchedData(req, { locations: ['query'] });
    try {
        res.json(await puzzleService.removePuzzle(allData));
    } catch(err) {
        next(err);
    }
}

export = {create: createPuzzle, createGame: createGame, updateGame: updatePuzzle, endGame: removePuzzle }