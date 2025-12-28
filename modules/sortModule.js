function sortStringsIgnoringSpaces(arr) {
    return [...arr].sort((a, b) => {
        // Убираем все пробелы для сравнения
        const aClean = a.replace(/\s+/g, '');
        const bClean = b.replace(/\s+/g, '');
        return aClean.localeCompare(bClean);
    });
}

module.exports = { sortStringsIgnoringSpaces };