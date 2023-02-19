export function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

export function getShuffledAnswers(correct: string | undefined, incorrect: any[] | undefined){
    const incorrectAnswers = incorrect?.map((answer) => {
        return { value: false, content: answer };
      });
    
      const correctAnswer = [
        {
          value: true,
          content: replaceChars(correct || "")
        },
      ];
      return shuffleArray(correctAnswer.concat(incorrectAnswers || []));
}

export function replaceChars(string: string){
  return string.replace(/&quot;/g, '"')
  .replace(/&#039;/g, "'")
  .replace(/&ldquo;/g, "'")
  .replace(/&rsquo;/g, "'")
  .replace(/&iacute;/g, "i")
  .replace(/&#039;/g, "'")
  .replace(/&amp;/g, "&")
  .replace(/&eacute;/g, "é")
  .replace(/&#039;/g, "'")
  .replace(/#&039;/g, "'")
}