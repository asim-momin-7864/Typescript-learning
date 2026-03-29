//* User Role Validator

// 3 different users - User, Viewer, Admin
// so they need 3 types

/*

do not make this common type it is veyr basic 
then you cannot able to define each roles speciale fields

    {

        name: string;
        password: string;
        role: "Viewer" | "Editor" | "Admin"

    }


*/

// Viewer
type Viewer = {
  username: string;
  name: string;
  password: string;
  lastLogin: Date;
  role: "Viewer";
};

// Editor
type Editor = {
  name: string;
  password: string;
  role: "Editor";
  totalDocumentEdit: number;
};

// Admin
type Admin = {
  sectionName: string;
  password: string;
  loginTime: Date;
  logoutTime: Date;
  role: "Admin";
};

//* Safe data way

// create users using types

// user 1
let user1: Viewer = {
  username: "@monkeyKing",
  name: "Roger Saitama",
  password: "1234",
  lastLogin: new Date(),
  role: "Viewer",
};

// user 2
let user2: Editor = {
  name: "Muzan Lord",
  password: "45234",
  role: "Editor",
  totalDocumentEdit: 23,
};

// user 3
let user3: Admin = {
  sectionName: "Database Management",
  password: "Admin4321",
  loginTime: new Date(),
  logoutTime: new Date("2026-01-04T10:00:00"),
  role: "Admin",
};

//* Unsafe External API data

// Uknown data from external API
//correct data
let unknowData1 = {
  sectionName: "Network Management",
  password: "Admin6666",
  loginTime: new Date(),
  logoutTime: new Date(),
  role: "Admin",
};

// uncorrect data
let unknowData2 = {
  sectionName: "Frontend Management",
  password: 2123131,
  role: "Support",
  Balance: 499,
};

//* Document edit permission Validator func
// show different outputs for different types - Type Narrowing

function canEditDocumentValidator(user: Viewer | Editor | Admin): void {
  // check is user is Viewer
  if (user.role === "Viewer") {
    console.log(
      `\n Sorry! user you are Viewer, You cannot have Permisson to Edit this File 
       \n Your Detailes : 
       \n Username: ${user.username} 
       \n Role: ${user.role} 
        `,
    );
  }

  // if user is Editor
  if (user.role === "Editor") {
    console.log(`
        \n You have Permission to Edit this document, You are Editor 
        \n Your Detailes : 
        \n Username: ${user.name} 
        \n Role: ${user.role}
        \n Total Document You Edited: ${user.totalDocumentEdit}
        `);
  }

  // if user is Admin
  if (user.role === "Admin") {
    console.log(`
        \n Welcome! You are Admin, You have all access of this Server
        \n Your Detailes : 
        \n Section Name: ${user.sectionName} 
        \n Role: ${user.role}
        \n Last Login: ${user.loginTime}
        \n Last Logout: ${user.logoutTime}
        `);
  }
}

// isAdminType: Custome Type Guard
function isAdminType(data: any): data is Admin {
  // check data is Object
  if (typeof data !== "object" || data === null) {
    console.log("\nUser data is not Object type");
    return false;
  }

  // checking - role
  if (!Object.hasOwn(data, "role") || typeof data.role !== "string") {
    console.log("\nUser does not have Role property");
    return false;
  }

  // check role
  if (data.role !== "Admin") {
    console.log(`\nAccess Denied \nRole is not admin`);
    return false;
  }

  // check other required properties
  if (
    !Object.hasOwn(data, "sectionName") ||
    !Object.hasOwn(data, "password") ||
    !Object.hasOwn(data, "loginTime") ||
    !Object.hasOwn(data, "logoutTime") ||
    typeof data.sectionName !== "string" ||
    typeof data.loginTime !== "object" ||
    typeof data.logoutTime !== "object" ||
    typeof data.password !== "string"
  ) {
    console.log(
      "\nAccess Denied \nSome Properties and their name types are not exists or match",
    );
    return false;
  }

  // after checking properties , it matches to our Admin type
  // so return true it can accepted as Admin Type
  return true;
}

//----------------------------------------

//* Test

//* safe user data
canEditDocumentValidator(user1);
console.log(
  "\n------------------------------------------------------------------\n",
);

canEditDocumentValidator(user2);

console.log(
  "\n------------------------------------------------------------------\n",
);

canEditDocumentValidator(user3);

console.log(
  "\n------------------------------------------------------------------\n",
);

//--------------------------------------

//* Unsafe user data

if (isAdminType(unknowData1)) {
  canEditDocumentValidator(unknowData1);
}

console.log(
  "\n------------------------------------------------------------------\n",
);

//----------------------------------

if (isAdminType(unknowData2)) {
  canEditDocumentValidator(unknowData2);
}
