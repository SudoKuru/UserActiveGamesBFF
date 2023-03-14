/**
 * This is the puzzle service file
 * This file takes input from the controller and directs it to the db.service file
 * The five functions are {@link puzzleCreateService}, {@link createGameService},
 * {@link puzzleUpdateService}, {@link puzzleRemoveService}, and {@link filterInputQuery}
 * The main purpose of this service file is to perform the 'business' logic
 * Any errors will be caught by our try/catch block in our controller
 * @module
 */

import {sendRequest} from "../requests/userActiveGamesBFF.requests";
import {Response} from "express";
import {CustomError, CustomErrorEnum} from "../models/error.model";

require('dotenv').config();
const basePuzzleUrl = process.env.PUZZLE_URL;
const baseUserActiveGamesUrl = process.env.USER_ACTIVE_GAMES_URL;

/**
 * This function takes in the input query and throws and error if no puzzles
 * are found to match the query
 * This function calls a helper function to create the inputQuery for the dataBase function
 * @param difficulty is an integer storing requested difficulty
 * @param userId is a string storing userId of the requester
 */
async function createGameService(difficulty:number, token:any) {

    // delete all existing user active games
    let res:Response = sendRequest(baseUserActiveGamesUrl, token.toString(),  "DELETE", "");

    // if the delete fails, throw error
    if (res.status !== 200){
        throw new CustomError(CustomErrorEnum.STARTGAME_DELETEOLDACTIVEGAMES_FAILED, res.status);
    }

    // get puzzle from puzzle database
    res = sendRequest(basePuzzleUrl + "", token.toString(), "GET", "");

    //todo verify game has not been played before by player

    // if the get fails, throw error
    if (res.status !== 200){
        throw new CustomError(CustomErrorEnum.STARTGAME_GETPUZZLE_FAILED, res.status);
    }

    // create active game with puzzle info
    res = sendRequest(baseUserActiveGamesUrl, token.toString(), "POST", "");

    // if the post fails, throw error
    if (res.status !== 201){
        throw new CustomError(CustomErrorEnum.STARTGAME_CREATEACTIVEGAME_FAILED, res.status);
    }

    // return new UserActiveGame object.
    return res;
}

/**
 * This function takes the JSON puzzles and sends them to the upload function
 * There is no need for any additional logic here
 * @param puzzles This is an array of JSON puzzles
 */
async function puzzleCreateService(puzzles) {

}

/**
 * This function takes in bodyData and queryData and updates all puzzles
 * that match the queryData with the bodyData
 * This function calls a helper function to create the inputQuery for the database function
 * @param bodyData this stores a JSON object with values to be updated
 * @param queryData this stores a JSON object with values used to retrieve puzzles to be updated
 */
async function puzzleUpdateService(bodyData, queryData) {
}

/**
 * This function takes in the input query and deletes any puzzles that match the query
 * We do not throw an error here to stay aligned with standard practice.
 * A delete request is successful even if the object did not exist.
 * @param puzzles this stores a JSON object that stores the query
 */
async function puzzleRemoveService(puzzles) {
}

export = { createPuzzle: puzzleCreateService, createGameService, updatePuzzle: puzzleUpdateService, removePuzzle: puzzleRemoveService };

