export function getArraySubset({ array, startRowIndex = 0, endRowIndex, startColumnIndex = 0, endColumnIndex }) {
  return array.slice(startRowIndex, endRowIndex)
      .map(row => row && row.slice(startColumnIndex, endColumnIndex));
};

export function restoreArrayFromSubset({ sourceArray, arraySubset, startIndex = 0, totalCount }) {
  return [...new Array(totalCount + startIndex).keys()].map((rowIndex) => {
    const row = sourceArray[rowIndex];
    const subsetRow = arraySubset[rowIndex - startIndex];
    return subsetRow || row;
  });
};