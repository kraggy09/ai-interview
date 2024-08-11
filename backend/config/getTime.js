import moment from "moment-timezone";

const getTime = () => {
  return moment().tz("Asia/Kolkata").format(); // or format according to your needs
};

export default getTime;
