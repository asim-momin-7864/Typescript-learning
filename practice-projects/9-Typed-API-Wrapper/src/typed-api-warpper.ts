//* typed API Wrapper

//TODO interface and subinterfaces

//* user interface

// subinterfaces

//geo
interface Geo {
    lat: string;
    lng: string;
}

// address
interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

// company
interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

// user
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

//------------------------------------------------------------------------

//* Post

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

//------------------------------------------------------------------------

//TODO apiCall (url) with generics
export async function apiCall<T>(url: string): Promise<T[]> {
    try {
        // all fetch logic
        let response = await fetch(url);

        //Test
        // console.log(response);

        // if failed
        if (!response.ok) {
            throw Error(
                `Request Failed, Status Code: ${response.status}, Message: ${response.statusText}`,
            );
        }

        let usersData = await response.json();

        //test
        // console.log(jsResponse);

        console.log(
            `Request Successful, Status Code: ${response.status}, Message: ${response.statusText}`,
        );

        // return usersData as Promise<T[]>; //* no need to do manually , above coe will automatically put
        return usersData;
    } catch (error: unknown) {
        // checking
        if (error instanceof Error) {
            console.log(`
                Error Name: ${error.name}\n
                Error Message: ${error.message}\n
                Error Cause: ${error.cause}\n
                `);

            throw new Error(`
                Error Name: ${error.name}\n
                Error Message: ${error.message}\n
                Error Cause: ${error.cause}\n
                `);
        } else {
            console.log("Unknow Error, Something went wrong at apiCall function");

            //! do not return error, insted throw error
            // return new Error(`Unknow Error, Something went wrong at apiCall function`);

            /* You should throw it.
                                       When you throw, you immediately stop the function and trigger the Promise to "reject." 
                                       This tells TypeScript, "Hey, the contract is broken, don't expect a T[] here." */
            throw new Error("Unknow Error, Something went wrong at apiCall function");
        }
    }
}

/*

* Option 2: Passing the Function as an Argument (Dependency Injection)

Passing the function as an argument is a pattern called Dependency Injection. 
We use this a lot in enterprise apps because it makes unit testing incredibly easy 
(you can pass a fake apiCall that just returns mock data instantly).

*/

//TODO handleData() with generics
export async function handleData<T>(
    url: string,
    datafetcher: (url: string) => Promise<T[]>,
) {
    try {
        console.log(`\nURL: ${url}\n`);

        // call
        //! now how works
        // let data: Promise<T[]> = await datafetcher(url);

        /*
                
                Remember our "Shipping Box" analogy?
        
                datafetcher(url) returns the sealed box (Promise<T[]>).
        
                The await keyword is your box-cutter. 
             *   It slices the box open and takes the plain data out of the box.
        
                However, right after you used the box-cutter (await), 
                you explicitly told TypeScript: "Hey, this variable named 'data' is going to hold a sealed box (Promise<T[]>)."
        
                TypeScript looks at this and says: 
                "Wait a minute! You just used await to unwrap the data. 
                You are holding a plain array (T[]) in your hands right now, 
                but you are trying to stuff it into a variable that is strictly supposed to hold a Promise. 
                A plain array doesn't have Promise methods like .then or .catch!"
                
                
                */


        let data: T[] = await datafetcher(url)

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`
                    Error Name: ${error.name}
                    Error Message: ${error.message}
                    Error Cause: ${error.cause}
                    `);

            throw new Error(`
                    Error Name: ${error.name}
                    Error Message: ${error.message}
                    Error Cause: ${error.cause}
                    `);
        } else {
            console.log(`Something went wrong in handleData function`);
            throw new Error(`Something went wrong in handleData function`);
        }
    }
}

//* TEST

// instance for users
handleData<User>("https://jsonplaceholder.typicode.com/users", apiCall);

// instance for posts
handleData<Post>("https://jsonplaceholder.typicode.com/posts", apiCall);
