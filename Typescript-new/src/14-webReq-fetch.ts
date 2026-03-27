//* fetch with typescript
// same Web Resquest as axios but with fetch

// fetch is more manual
// axios have good support for typescript
// tanstack like libraries have more typescipt support

interface Todo {
  userId: number;
  id: number;
  title: string;
  complete: boolean;
}

const fetchData = async () => {
  try {
    const response = await fetch("https://jsonplacholder.typecode.com/todo/1");

    // we need to manually check
    if (!response.ok) {
      throw new Error(` HTTP error ${response.status} `);
    }

    // data
    const data: Todo = await response.json();
  } catch (error: any) {
    console.log(" Error ", error.message);
  }
};
