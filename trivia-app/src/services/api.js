export const fetchQuestions = async () => {

    try {
        const response = await fetch('https://coderespite.com/api/trivia-questions.json');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }

   
  };
  