export const fetchRandomUUID = async () => {
  const response = await fetch('/api/get-random-hash');
  const { uid } = await response.json();
  return uid;
};
