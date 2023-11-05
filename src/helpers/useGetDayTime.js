export const getDayTime = () => {
  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 12;
  return isDayTime ? "morning" : "afternoon";
};
