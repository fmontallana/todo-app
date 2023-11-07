export const getDayTime = () => {
  const hours = new Date().getHours();
  const dayTime = hours > 6 && hours < 12 ? "morning" : 
                  hours > 12 && hours < 18 ? "afternoon" : 
                  "evening";
  return dayTime;
};
