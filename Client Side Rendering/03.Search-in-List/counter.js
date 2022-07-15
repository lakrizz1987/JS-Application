export function counter(towns, match) {
    let count = 0;
    if (match != '') {
       for (const iterator of towns) {
          if (iterator.toLowerCase().includes(match.toLowerCase())) {
             count++
          }
 
       }
    }
    return (count == 0) ? '' : count;
 }