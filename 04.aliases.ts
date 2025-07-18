// we can make kind our custome type
type User = {
  username: string;
  password: number;
  isActive: boolean;
};

// use of aliases in function also for return value type safety
function loginUser(user: User): User {
  return {
    username: user.username,
    password: user.password,
    isActive: user.isActive,
  };
}

let newUser3 = {
  username: "hashira",
  password: 1234,
  isActive: true,
};

// [1]
loginUser(newUser3);

//[2]
loginUser({ username: "shinobi", password: 1234, isActive: true });

//[3]
loginUser({username: "asim", password: 1234, isActive: false});

export {};
