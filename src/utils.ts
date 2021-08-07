interface GetArraySubsetArgs<T> {
  array: T[][];
  startRowIndex?: number;
  endRowIndex: number;
  startColumnIndex?: number;
  endColumnIndex: number;
}

export const getArraySubset = <T>({
  array,
  startRowIndex = 0,
  endRowIndex,
  startColumnIndex = 0,
  endColumnIndex,
}: GetArraySubsetArgs<T>) => (
    array.slice(startRowIndex, endRowIndex)
      .map(row => row && row.slice(startColumnIndex, endColumnIndex))
  );

interface RestoreArrayFromSubsetArgs<T> {
  sourceArray: T[];
  arraySubset: T[];
  startIndex?: number;
  totalCount: number;
}

export const restoreArrayFromSubset = <T>({
  sourceArray,
  arraySubset,
  startIndex = 0,
  totalCount,
}: RestoreArrayFromSubsetArgs<T>) => (
    [...new Array(totalCount + startIndex).keys()].map(rowIndex => {
      const row = sourceArray[rowIndex];
      const subsetRow = arraySubset[rowIndex - startIndex];
      return subsetRow || row;
    })
  );
