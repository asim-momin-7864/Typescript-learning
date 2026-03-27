//* Axios with typescript

// for more detailes watch : https://youtu.be/GTyKTyw2GhI?si=vKHUDBKfgKayN2Uk

// installed : npm i axios
// along with libraries automatically types get installed  (typescript support for that library)
// you see suggation

//! if not see suggations
//* But when we did not get types use below methods / ways

//* METHOD 1 ( it is standard way we publish types in same repo , where get declaration files  )

// npm i -D @types/some-library

//* METHOD 2 ( if above method wont work )

// we make "some-library.d.ts" file
// go to that libraries decoumentation where you declaration files copy and paste in your file

//-----------------------------------------------------------

//* 'AxiosResponse' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
// import axios, { AxiosResponse } from "axios";

//* All red-scuggly line are not error, some are for Improvments, Suggations

// axios is service
import axios, { isAxiosError } from "axios";

// AxiosResponse is a type ( generic for holding Response ) - Recommended Practice
import type { AxiosResponse } from "axios";

//* Basic Syntax / implementation

axios.get("https://example.com/data").then((response) => {
  console.log(response.data);
});

//-------------------------------------------------------------------

//* Example and proper use of axios with typescript and othe concepts like - interfaces and generics

// first we make interface - for both Request and Response

/*

Our Response

{
    "userId": 1,
    "id": 1,
    "title": "delete coding gym task",
    "complete": false,
}

*/

// this is that T we use in generic (our datatype want to use in generic function)
interface Todo {
  userId: number;
  id: number;
  title: string;
  complete: boolean;
}

const fetchData = async () => {
  try {
    // using pre-defined generics with our datatype
    // they handle data very well , structure it, give us extra useful data along with our T (our main reponse data type)
    // give use many useful suggation of data and follow standard API Request structure in standard way - so we dont hav to handle it manully
    // Recommended Practice to use
    const response: AxiosResponse<Todo> = await axios.get(
      "https://jsonplacholder.typecode.com/todo/1",
    );

    // get some suggations / extra data
    console.log("Todo status", response.status);
    console.log("Todo data", response.data);
    console.log("Todo header", response.headers);
    console.log("Todo request", response.request);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // suggations / extar data
      console.log(" Axios Message", error.message);
      console.log(" Axios Cause", error.cause);
      console.log(" Axios Status", error.status);
      console.log(" Axios Name", error.name);

      // we can destructure more - if error is different

      if (error.response) {
        console.log(error.response.status);
      }
    }
  }
};
