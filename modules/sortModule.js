function sortStringsIgnoringSpaces(arr) {
    return [...arr].sort((a, b) => {
        const aClean = a.replace(/\s+/g, '');
        const bClean = b.replace(/\s+/g, '');
        return aClean.localeCompare(bClean);
    });
}

module.exports = { sortStringsIgnoringSpaces };
