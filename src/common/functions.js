


export const areAllChaptersFinished = (chapterResults) => chapterResults.every(r => r.overviewCompleted && r.testCompleted) 


export default {areAllChaptersFinished}