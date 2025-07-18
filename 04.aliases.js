"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// use of aliases in function also for return value type safety
function loginUser(user) {
    return {
        username: user.username,
        password: user.password,
        isActive: user.isActive,
    };
}
var newUser3 = {
    username: "hashira",
    password: 1234,
    isActive: true,
};
// [1]
loginUser(newUser3);
//[2]
loginUser({ username: "shinobi", password: 1234, isActive: true });
//[3]
loginUser({ username: "asim", password: 1234, isActive: false });
