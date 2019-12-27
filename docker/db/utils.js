/**
 * forEach function that supports async/await callback
 *
 * @param array {array} list to iterate
 * @param callback {function} async fn to call for each list item
 * @see https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
 */
exports.asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
