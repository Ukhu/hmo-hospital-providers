const jsonGet = (json, query) => {
  // TASK 1: 
  // Write a function that returns the appropriate value in a JSON object
  // matching the given string representation of the query.
  // Example:
  // const a = {
  //    user: {
  //      id: a,
  //      name: {
  //        firstName: "James",
  //        lastName: "Ibori"
  //      },
  //      location: {
  //        city: "Ikoyi",
  //        state: "Lagos",
  //        address: "One expensive house like that"
  //      }
  //    }
  // }
  // const fullName = {`${jsonGet(a, 'user.name.firstName')} ${jsonGet(a, 'user.name.lastName')}` 
  // const address = jsonGet(a, 'user.location.address')

  // ============== CODE GOES BELOW THIS LINE :) ==============
  return query.split('.').reduce((o,i)=>o[i], json)
};

export default jsonGet;
