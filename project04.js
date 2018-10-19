/**
 *   @author Lee Marshall (marshalll@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary
 *   @todo Nothing
 */

"use strict";
const PROMPT = require('readline-sync');



let movieInfo = [];


let titleValue, action, stars;





/**
 * @method
 * @desc The dispatch method for our program
 * @returns {null}
 */
function main() {
    while (action !== 99) {//loops program indefinitely

        while (movieInfo.length === 0) {//sets first movie info
            setmovieInfo();
        }
        chooseAction();
        branchAction();
        console.log(movieInfo);
        console.log(movieInfo[titleValue][2]);
    }

}

main();


function setmovieInfo() {
    let i = (movieInfo.length - 1);
    if (i < 0){
        i = 0;
    }
    movieInfo[i] = [];
    while (! movieInfo[i][0] || !/^[a-zA-Z -]{1,50}$/.test(movieInfo[i][0])){
        movieInfo[i][0] = PROMPT.question(`Please enter movie title: `);
        if (!/^[a-zA-Z -]{1,50}$/.test(movieInfo[i][0])){
            console.log(`$(movieInfo[i][0]} is not valid, Please enter movie title)`);
        }
    }
    titleValue = i;
    setStars();
    movieInfo[i][1] = Number(stars);
    movieInfo[i][2] = [];
    movieInfo[i][2][0] = movieInfo[i][1];
    movieInfo[i][3] = 1;
    console.log(`\x1Bc`);
    console.log(`\nThank you for your input. `)

}



function chooseTitle() {
    const MIN_ACTION = 1;

    while (titleValue == null || titleValue > (movieInfo.length + 1) || titleValue < MIN_ACTION || !/[0-9]/.test(titleValue)) {
        console.log(`Which movie would you like to rate? `);
        for (let i = 0; i < movieInfo.length; i++) {
            console.log(`[${i + 1}] ${movieInfo[i][0]}`);
        }
        titleValue = Number(PROMPT.question(`Please enter the appropriate value [1-${movieInfo.length}]: `));
        if (titleValue == null || titleValue > (movieInfo.length + 1) || titleValue < MIN_ACTION || !/[0-9]/.test(titleValue)) {
            console.log(`\x1Bc`);
            console.log(`not a valid option, please try again.`);
        }
    }
    titleValue--;
}


function chooseAction() {
    const MAX_ACTION = 3;
    const MIN_ACTION = 1;
    action = null;
    while (action === null || action > MAX_ACTION || action < MIN_ACTION || !/[0-9]/.test(action)) {
        console.log(`\nWhat would you like to do? `);
        console.log(`\n[1] Rate a movie.`);
        console.log(`[2] View a movie's average rating.`);
        console.log(`[3] Add a new movie. `);
        action = Number(PROMPT.question(`\nPlease enter the appropriate value [1-${MAX_ACTION}]: `));
        if (action === null || action > MAX_ACTION || action < MIN_ACTION || !/[0-9]/.test(action)) {
            console.log(`\x1Bc`);
            console.log(`not a valid option, please try again.`);
        }
    }
}



/**
 * @method
 * @desc
 * @returns{method}
 */
function branchAction() {
    switch (action) {
        case 1:
            chooseTitle();
            setStars();
            //movieInfo[titleValue][2] = [];
            movieInfo[titleValue][1] = Number(stars);
            movieInfo[titleValue][2].push(Number(stars));
            movieInfo[titleValue][3]++;

            break;
        case 2:
            chooseTitle();

            break;
        default:
            setmovieInfo();
    }

}




function setStars() {
    const MIN_STAR = 0;
    const MAX_STAR = 5;
    stars = null;
    while (stars == null || stars < MIN_STAR || stars > MAX_STAR || !/[0-9]/.test(stars)) {
        console.log(`\nWith 0 stars being worst and 5 stars equaling the best, how would you rate the movie "${movieInfo[titleValue][0]}" ?`);
        stars = PROMPT.question(`Please enter a number from 0 to 5 representing how many stars you would give this movie: `);
        if (stars == null || stars < MIN_STAR || stars > MAX_STAR || !/[0-9]/.test(stars)) {
            console.log(`\nIncorrect rating, please try again.`);
        }
    }
    console.log(`\nThank you for your vote of ` + stars + ` stars.`);

}



