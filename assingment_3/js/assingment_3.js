// 1:Write a function called fetchAlbums that uses the JSONPlaceholder
//  API (https://jsonplaceholder.typicode.com) to fetch a list of albums 
//       and returns a promise that resolves to an array of album objects. 
//       Use the fetch method to make the API call and the json method to parse 
//       the response. Use the filter method to filter out the albums that do not 
//       have a title. Use the map method to transform the remaining albums into 
//       a simpler format. Write code to test this function by calling it and logging 
//       the result.
async function fetchAlbums() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        const albums = await response.json();
        const filteredAlbums = albums.filter(album => album.title);
            const transformedAlbums = filteredAlbums.map(album => ({
          id: album.id,
          title: album.title
        }));   
        return transformedAlbums;
      } catch (error) {
        console.error('Error fetching albums:', error);
        return [];
      }
    }
    
    fetchAlbums().then(albums => {
      console.log('Fetched albums:', albums);
    });
    
//     2:  Define a function named fetchPosts that uses the JSONPlaceholder 
//     API (https://jsonplaceholder.typicode.com) to fetch a list of posts
//        and returns a promise that resolves to an array of post objects.
//         Use the axios library to make the API call and the data property 
//         to parse the response. Use the filter method to filter out the posts 
//         that do not have a title. Use the sort method to sort the remaining 
//         posts by their ID in ascending order. 
//       Write code to test this function by calling it and logging the result.
// const axios = require('axios');

async function fetchPosts() {
  try {
    console.log('Starting to fetch posts...');
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log('Response received:', response.status);
    const posts = response.data;
    console.log('Total posts fetched:', posts.length);
    const filteredPosts = posts.filter(post => post.title);
    console.log('Filtered posts:', filteredPosts.length);
    const sortedPosts = filteredPosts.sort((a, b) => a.id - b.id);
    return sortedPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

fetchPosts().then(posts => {
  console.log('Fetched posts:', posts);
});

//3: Write a function called fetchUsers that uses the JSONPlaceholder API 
// (https://jsonplaceholder.typicode.com) to fetch a list of users and
//        returns a promise that resolves to an array of user objects.
//         Use the fetch method to make the API call and the json method 
//         to parse the response. Use the filter method to filter out the
//          users that do not have an email address. Use the reduce method
//           to calculate the total number of users that have a phone number listed.
//            Write code to test this function by calling it and logging the result.
async function fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        const usersWithEmail = users.filter(user => user.email);
        const totalUsersWithPhoneNumber = usersWithEmail.reduce((count, user) => {
          return user.phone ? count + 1 : count;
        }, 0);
        return { usersWithEmail, totalUsersWithPhoneNumber };
      } catch (error) {
        console.error('Error fetching users:', error);
        return { usersWithEmail: [], totalUsersWithPhoneNumber: 0 };
      }
    } 
    fetchUsers().then(result => {
      console.log('Users with email:', result.usersWithEmail);
      console.log('Total users with phone number:', result.totalUsersWithPhoneNumber);
    });

//4: Define a function named fetchComments that uses the JSONPlaceholder
//  API (https://jsonplaceholder.typicode.com) to fetch a list of comments
//        and returns a promise that resolves to an array of comment objects.
//         Use the axios library to make the API call and the data property to
//          parse the response. Use the filter method to filter out the comments 
//          that do not have a name. Use the forEach method to display the remaining
//           comments in a table format on a webpage. Write code to test this function 
//           by calling it and displaying the result on a webpage.
// Note:
// It should be implement on simple html file where javascript tag should 
// use and fetch or axios should use for getting the data. and when data 
// will be get from 3rd party API it should be display on table tag. You 
// can use css or bootstrap too.
    
async function fetchComments() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
    const comments = response.data;

    const commentsWithName = comments.filter(comment => comment.name);
    const commentsBody = document.getElementById('commentsBody');

    commentsWithName.forEach(comment => {
      const row = `
        <tr>
          <td>${comment.id}</td>
          <td>${comment.name}</td>
          <td>${comment.email}</td>
          <td>${comment.body}</td>
        </tr>
      `;
      commentsBody.innerHTML += row;
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}
fetchComments();


    //5. Write a function called fetchTodos that uses the JSONPlaceholder
    //  API (https://jsonplaceholder.typicode.com) to fetch a list of todos
    //    and returns a promise that resolves to an array of todo objects.
    //     Use the fetch method to make the API call and the json method to
    //      parse the response. Use the filter method to filter out the todos
    //       that are already completed. Use the map method to transform the 
    //       remaining todos into a simpler format.
    //    Write code to test this function by calling it and logging the result.
    async function fetchTodos() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const todos = await response.json();
            const incompleteTodos = todos.filter(todo => !todo.completed);
            const simplifiedTodos = incompleteTodos.map(todo => ({
          id: todo.id,
          title: todo.title,
          userId: todo.userId
        }));
    
        return simplifiedTodos;
      } catch (error) {
        console.error('Error fetching todos:', error);
        return [];
      }
    }
        fetchTodos().then(todos => {
      console.log('Fetched todos:', todos);
    });
    