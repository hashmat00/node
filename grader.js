function average(scores){
    //add total
    var total = 0;
    scores.forEach(function(score){
        total += score;
    });
    //divide by number of score
    var avg = total/scores.length
    //round average
    return Math.round(avg)
}





var scores = [90, 60, 50, 80, 94, 100];
console.log(average(scores));



var scores2 = [90, 60, 100, 40, 55, 80, 94, 100];
console.log(average(scores2));