//* Async Task Retry Logic

//! we not declare generics earlier as classes and then use
// // define generic for function
// function retryRequestFuncGeneric<T>(promise: T ): T {
//     return promise;
// }

//* type for APIResponse
type ApiResponse = {
    status: number;
    message: string;
};

//TODO Task API Simulator (sometimes success or failed)
// we write generic directly with function / interfaces..
function asyncTaskSimulator(): Promise<ApiResponse> {
    let newPromise = new Promise<ApiResponse>((resolve, reject) => {
        // to simulate request can be successful or failed
        let randomNumber: number = Math.random();
        console.log("Random Number ",randomNumber);

        if (randomNumber > 0.7) {
            resolve({
                status: 200,
                message: "Request Successful",
            });
        } else {
            reject(new Error("Request Failed"));
        }
    });

    // returning Promise so we can use with then and catch
    return newPromise;
}

//TODO RetryRequestFunction (retry upto few times)
function retryRequestFunc(apiCallFunc: () => Promise<ApiResponse>, tryCount: number = 1) {

    // counter for loop tracking we pass as argument , so it can remember its attempt in recursion
    // maxRetry counter
    let maxRetry = 3;


    // call task simulator func
    let newPromise: Promise<ApiResponse> = apiCallFunc();

    newPromise
        .then(
            (response) => {
               console.log(`\n 🟢 [SUCCESS] Data Fetched! Status: ${response.status} | ${response.message}\n`);
            }
        )
        .catch(
            (response) => {

                // checking this if we get error from else or in different format
                if (response instanceof Error) {

                   console.log(`\n 🔴 [FAILED] Request to server failed. Attempt ${tryCount} | Error: ${response.message}\n`);

                    // retry condition
                    if (tryCount <= maxRetry) {
                      console.log(`\n⏳ [RETRYING] Waiting 2 seconds before trying again...\n`);
                        // some rest between sending new request
                        let ID = setTimeout(
                            () => {
                                retryRequestFunc(apiCallFunc, tryCount + 1)

                                // clearTimeout(ID); no need
                            }, 2000
                        )
                    }

                }
            }
        )

};


//* TEST
retryRequestFunc(asyncTaskSimulator);