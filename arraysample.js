/**
 *   @author Bates, Howard (hbates@northmen.org)
 *   @version 0.0.1
 *   @summary Code demonstration: Collections (Arrays) :: created: 6.13.2017
 *   @todo Nothing
 */

"use strict";
const PROMPT = require('readline-sync');

let continueResponse;
let numStudents;
let students = [], rewardStudents = [];

/**
 * @method
 * @desc The dispatch method for our program
 * @returns {null}
 */
function main() {
    if (continueResponse !== 0 && continueResponse !== 1) {
        setContinueResponse();
    }
    setNumStudents();
    populateStudents();
    while (continueResponse === 1) {
        determineRewardStudent();
        displayRewardStudent();
        setContinueResponse();
    }
}

main();

/**
 * @method
 * @desc continueResponse mutator
 * @returns {null}
 */
function setContinueResponse() {
    if (continueResponse === 1 || continueResponse === 0) {
        continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        while (continueResponse !== 0 && continueResponse !== 1) {
            console.log(`${continueResponse} is an incorrect value. Please try again.`);
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        }
    } else {
        continueResponse = 1;
    }
}

/**
 * @method
 * @desc numStudents mutator
 * @returns {null}
 */
function setNumStudents() {
    const MIN_STUDENTS = 1, MAX_STUDENTS = 34;
    while (! numStudents || numStudents < MIN_STUDENTS || numStudents > MAX_STUDENTS) {
        numStudents = Number(PROMPT.question(`Please enter number of students in classroom: `));
        if (isNaN(parseInt(numStudents)) || numStudents < MIN_STUDENTS || numStudents > MAX_STUDENTS) {
            console.log(`${numStudents} is an incorrect value. Please try again.`);
        }
    }
}

/**
 * @method
 * @desc students MD array mutator
 * @returns {null}
 */
function populateStudents() {
    const MIN_GRADE = 0, MAX_GRADE = 8;
    for (let i = 0; i < numStudents; i++) {
        students[i] = [];
        console.log(`\nStudent ${i + 1}:`);
        while (! students[i][0] || !/^[a-zA-Z -]{1,30}$/.test(students[i][0])) {
            students[i][0] = PROMPT.question(`Please enter last name: `);
            if (! /^[a-zA-Z -]{1,30}$/.test(students[i][0])) {
                console.log(`${students[i][0]} is invalid. Please try again.`);
            }
        }
        while (! students[i][1] || !/^[a-zA-Z -]{1,30}$/.test(students[i][1])) {
            students[i][1] = PROMPT.question(`Please enter first name: `);
            if (! /^[a-zA-Z -]{1,30}$/.test(students[i][1])) {
                console.log(`${students[i][1]} is invalid. Please try again.`);
            }
        }
        while (! students[i][2] || !/^\d{2}\/\d{2}\/\d{4}$/.test(students[i][2])) {
            students[i][2] = PROMPT.question(`Please enter date of birth (xx/xx/xxxx): `);
            if (! /^\d{2}\/\d{2}\/\d{4}$/.test(students[i][2])) {
                console.log(`${students[i][2]} is invalid. Please try again.`);
            }
        }
        while (! students[i][3] || students[i][3] < MIN_GRADE || students[i][3] > MAX_GRADE) {
            students[i][3] = PROMPT.question(`Please enter grade level (0-8): `);
            if (students[i][3] < MIN_GRADE || students[i][3] > MAX_GRADE) {
                console.log(`${students[i][3]} is invalid. Please try again.`);
            }
        }
        while (! students[i][4] || !/^[mMfF]$/.test(students[i][4])) {
            students[i][4] = PROMPT.question(`Please enter gender (m or f): `).toLowerCase();
            if (! /^[mMfF]$/.test(students[i][4])) {
                console.log(`${students[i][4]} is invalid. Please try again.`);
            }
        }
    }
}

/**
 * @method
 * @desc rewardedStudents SD array mutator
 * @returns {null}
 */
function determineRewardStudent() {
    let rewarded = false;
    while (! rewarded) {
        rewarded = true;
        let randomStudent = Math.floor((Math.random() * students.length));
        if (rewardStudents.length > 0 && rewardStudents.length < students.length) {
            for (let student of rewardStudents) {
                if (student === randomStudent) {
                    rewarded = false;
                    break;
                }
            }
            if (rewarded) {
                rewardStudents.push(randomStudent);
                break;
            }
        } else {
            rewardStudents = [];
            rewardStudents.push(randomStudent);
        }
    }
    console.log(rewardStudents);
}

/**
 * @method
 * @desc Utility method for outputting result
 * @returns {null}
 */
function displayRewardStudent() {
    console.log(`You get to reward ${students[rewardStudents[rewardStudents.length - 1]][0]} today!`);
}

/*
 The "Hurr Durr, Make 'em Smarter Everyday" private school has again contracted you to write software that stores the following
 information about each student: Last & first name, DoB, grade level, & gender. The software should also allow teacher to
 randomly select one (1) student per day to give a special reward. Previously selected students cannot be chosen again
 until entire class has been selected at least once.
 Topics:  Collections (single & multi-dimensional arrays), for..of loops, regular expressions (regex)
 */