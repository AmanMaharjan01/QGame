import axios from 'axios';

export const getQuizServices = async (difficulty: string) => {
  const res = await axios.get(
    `https://opentdb.com/api.php?amount=20&category=31&type=multiple&difficulty=${difficulty}`
  );
  if (res.status === 200) {
    return res;
  }
};
