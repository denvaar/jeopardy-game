/*
 Jest is called from Node and doesn't run test code through Webpack.
 Instead, we have to use Jest's mocking functions to replace the import with a stub file.
 The replacement itself is present in the package.json file
 */
export const ipcRenderer = {
  on: jest.fn()
};