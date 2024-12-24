const isVerified = true;

// if (isVerified == true) {
//   console.log("user is verified");
// } else {
//   console.log("user is not verified");
// }

// console.log(
//   `${isVerified === true ? "user is verified" : "user is not verified"}`
// );

function getTimeString(time) {
  //get Hour and rest seconds
  const hours = parseInt(time / 3600);
  let remainingSeconds = time % 3600;
  const minute = parseInt(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  return `
  ${hours} ${hours <= 1 ? "Hour" : "Hours"} ${minute} ${
    minute <= 1 ? "Minute" : "Minutes"
  } ${remainingSeconds} ${remainingSeconds <= 1 ? "second" : "seconds"}
  `;
}

console.log(getTimeString(16261));
