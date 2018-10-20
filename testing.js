



let movieInfo = [];
for (let i = 0; i < 6; i++){
    movieInfo[i] = [];
}

movieInfo[0][4] = 3;
movieInfo[1][4] = 11;
movieInfo[2][4] = 7;
movieInfo[3][4] = 1;
movieInfo[4][4] = 5;
movieInfo[5][4] = 9;

console.log(`\x1Bc`);
setrateOrder();


function setrateOrder() {
    let unsort = movieInfo.length - 1;
    let z = 0;
    while (z === 0){
        for (let y = 0; y < unsort; y++) {
            z = 1;
            for (let x = 0; x < unsort; x++){
                if (movieInfo[x + 1][4] > movieInfo[x][4]){
                    let temp = movieInfo[x + 1][4];
                    movieInfo[x + 1][4] = movieInfo[x][4];
                    movieInfo[x][4] = temp;
                    z = 0
                }


            }console.log(movieInfo);
            unsort--

        }
    }
}