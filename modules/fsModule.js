const syncFs = require('../fs-tasks/sync');
const asyncFs = require('../fs-tasks/async');

module.exports = {
    writeFile: syncFs.writeFile,
    readFile: syncFs.readFile,
    updateFile: syncFs.updateFile,
    clearFile: syncFs.clearFile,
    cleanFile: syncFs.cleanFile,
    copyFile: syncFs.copyFile,
    createDir: syncFs.createDir,
    removeDir: syncFs.removeDir,
    getAllFiles: syncFs.getAllFiles,
    cleanProject: syncFs.cleanProject,
    
   
    writeFileAsync: asyncFs.writeFileAsync,
    readFileAsync: asyncFs.readFileAsync,
    updateFileAsync: asyncFs.updateFileAsync,
    clearFileAsync: asyncFs.clearFileAsync,
    cleanFileAsync: asyncFs.cleanFileAsync,
    copyFileAsync: asyncFs.copyFileAsync,
    createDirAsync: asyncFs.createDirAsync,
    removeDirAsync: asyncFs.removeDirAsync,
    getAllFilesAsync: asyncFs.getAllFilesAsync
};
