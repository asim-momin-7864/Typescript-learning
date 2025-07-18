// object
const newUser = {
  name: "hitesh",
  email: "abc@xyz.in",
  isActive: true,
};

// normal function with obj as argument
function createUser({ username: string, isActive: boolean }) {}

createUser({ username: "King", isActive: true });

// function with return value type safety
function createCourse(): { cname: string; price: number } {
  return { cname: "DSA", price: 3400 };
}

createCourse();

// Odd Behaviour
//* [1]
//! createUser({username: "queen", isActive: false, email: "queen@mxm.com"})
// it throw error , we cannot pass extra argument

//* [2]
let newUser2 = {
  username: "joker",
  email: "abc@xyz.com",
  isActive: false,
};

createUser(newUser2);
// now when we pass explicitly decleared object it wont throw error , even have extra argument

export {};
