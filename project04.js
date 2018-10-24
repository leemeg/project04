/**
 *   @author Lee Marshall (marshalll@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary
 *   @todo Nothing
 */

"use strict";
const PROMPT = require('readline-sync');

const STARTERTITLES = ["The Hate U Give", "Halloween", "First Man", "Venom", "Bad Times", "Night School", "Goosebumps", "Star is Born"];

let movieInfo = [];

let titleValue, action, stars;


function main() {
    startTitles();
    while (action !== 99) {//loops program indefinitely, could add a stop in chooseAction()
        while (movieInfo.length === 0) {//auto sets first movies info
            setmovieInfo();
        }
        chooseAction();
        branchAction();
    }
}

main();


function setmovieInfo() {
    const MOVIE_TITLE = 0;
    const CURRENT_USER_RATING = 1;
    const ARRAY_OF_VOTES = 2;
    const NUM_VOTES = 3;
    const AVER_RATING = 4;

    let i = (movieInfo.length);
    if (i < 0){
        i = 0;
    }
    movieInfo[i] = [];
    console.log(`\x1Bc`);
    while (! movieInfo[i][MOVIE_TITLE] || !/^[a-zA-Z -]{1,50}$/.test(movieInfo[i][0])){
        movieInfo[i][MOVIE_TITLE] = PROMPT.question(`Please enter movie title: `);
        if (!/^[a-zA-Z -]{1,50}$/.test(movieInfo[i][MOVIE_TITLE])){
            console.log(`$(movieInfo[i][0]} is not valid, Please enter movie title)`);
        }
    }
    titleValue = i;
    setStars();
    movieInfo[i][CURRENT_USER_RATING] = Number(stars);
    movieInfo[i][ARRAY_OF_VOTES] = [];
    movieInfo[i][ARRAY_OF_VOTES][0] = movieInfo[i][1];
    movieInfo[i][NUM_VOTES] = 1;
    movieInfo[i][AVER_RATING] = movieInfo[i][1];
    console.log(`\x1Bc`);
    console.log(`\nThank you for your input. `)

}

function chooseTitle() {
    const MIN_ACTION = 1;
    titleValue = null;
    //console.log(`\n`);
    while (titleValue === null || titleValue > (movieInfo.length) || titleValue < MIN_ACTION || !/[0-9]/.test(titleValue)) {
        for (let i = 0; i < movieInfo.length; i++) {
            console.log(`[${i + 1}] ${movieInfo[i][0]}`);
        }
        titleValue = Number(PROMPT.question(`Please enter the appropriate value [1-${movieInfo.length}]: `));
        if (titleValue === null || titleValue > (movieInfo.length) || titleValue < MIN_ACTION || !/[0-9]/.test(titleValue)) {
            //console.log(`\x1Bc`);
            console.log(`not a valid option, please try again.`);
        }
    }
    titleValue--;
}

function chooseAction() {
    const MAX_ACTION = 4;
    const MIN_ACTION = 1;
    action = null;
    while (action === null || action > MAX_ACTION || action < MIN_ACTION || !/[0-9]/.test(action)) {
        console.log(`\nWhat would you like to do? `);
        console.log(`\n[1] Rate a movie.`);
        console.log(`[2] View a movie's average rating.`);
        console.log(`[3] Add a new movie. `);
        console.log(`[4] View and refresh movie order of highest to lowest ratings. `);
        action = Number(PROMPT.question(`\nPlease enter the appropriate value [1-${MAX_ACTION}]: `));
        if (action === null || action === null || action > MAX_ACTION || action < MIN_ACTION || !/[0-9]/.test(action)) {
            console.log(`\x1Bc`);
            console.log(`not a valid option, please try again.`);
        }
    }
}

function branchAction() {
    switch (action) {
        case 1:
            console.log(`\x1Bc`);
            console.log(`Which movie would you like to rate? `);
            chooseTitle();
            setStars();
            movieInfo[titleValue][1] = Number(stars);
            movieInfo[titleValue][2].push(Number(stars));
            movieInfo[titleValue][3]++;

            break;
        case 2:
            console.log(`\x1Bc`);
            console.log(`Which movie would you like to view? `);
            chooseTitle();
            calcAverage();
            console.log(`\x1Bc`);
            console.log(`\nThe average rating for the move ${movieInfo[titleValue][0]} is ${movieInfo[titleValue][4]} stars. `);
            break;
        case 3:
            setmovieInfo();
            break;
        default:
            console.log(`\x1Bc`);
            for (let e = 0; e < movieInfo.length; e++){
                titleValue = e;
                calcAverage();
            }
            setrateOrder();
            dispTitles();
            break;
    }

}

function setStars() {
    const MIN_STAR = 0;
    const MAX_STAR = 5;
    stars = null;
    console.log(`\x1Bc`);
    while (stars == null || stars < MIN_STAR || stars > MAX_STAR || !/[0-9]/.test(stars)) {
        console.log(`\nWith 0 stars being worst and 5 stars equaling the best, how would you rate the movie "${movieInfo[titleValue][0]}" ?`);
        stars = PROMPT.question(`Please enter a number from 0 to 5 representing how many stars you would give this movie: `);
        if (stars == null || stars < MIN_STAR || stars > MAX_STAR || !/[0-9]/.test(stars)) {
            console.log(`\nIncorrect rating, please try again.`);
        }
    }
    console.log(`\x1Bc`);
    console.log(`\nThank you for your vote of ` + stars + ` stars.`);

}

function calcAverage() {
    let sum = 0;

    for (let i = 0; i < movieInfo[titleValue][2].length; i++) {
        sum = sum + movieInfo[titleValue][2][i];
    }
    movieInfo[titleValue][4] = (sum / movieInfo[titleValue][2].length).toFixed(1);

}

function setrateOrder() {
    let unsort = movieInfo.length - 1;
    for (let y = 0; y < unsort; y++) {
        for (let x = 0; x < unsort; x++){
            if (movieInfo[x + 1][4] > movieInfo[x][4]){
                let temp = movieInfo[x + 1];
                movieInfo[x + 1] = movieInfo[x];
                movieInfo[x] = temp;
            }
        }

    }

}

function dispTitles() {
    console.log(`\x1Bc`);
    console.log(`Average Stars         Movie Title`);
    console.log(`-------------         -----------`);
    for (let i =0; i < movieInfo.length; i++){
        let tempAver = movieInfo[i][4];

        if (!/[0-9]/.test(tempAver)){
            console.log(`   Unrated            ${movieInfo[i][0]}`)
        }
        else {
            console.log(`     ${movieInfo[i][4]}              ${movieInfo[i][0]}`);
        }
    }

}

function startTitles() {
    for (let i = 0; i < STARTERTITLES.length; i++){
        movieInfo[i] = [];
        movieInfo[i][0] = STARTERTITLES[i];
        movieInfo[i][2] = [];
    }
}