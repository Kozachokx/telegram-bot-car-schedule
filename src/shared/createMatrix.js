
const createMatrix = (dataArr, maxRows, maxColumns) => {
  if (dataArr && dataArr.length) {
    const main = []
    let i = 0;

    for (let index = 0; index < dataArr.length; index++){
      if (!main[i]) main[i] = []
      main[i].push(dataArr[index])
      if ( (index+1) % maxRows === 0 ) i++;
    }

    return main;
  }
}

module.exports = { createMatrix }
