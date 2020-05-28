import { GET_USERS } from '../utility/constants';

// const users = [
// {
//     user_id: 1,
//     first_name: 'John',
//     last_name: 'Doe',
//     username: '@user1',
//     avatar: 'https://pbs.twimg.com/profile_images/1042531200299159552/_2adhnZs_200x200.jpg'
// },
// {
//     user_id: 2,
//     first_name: 'Jane',
//     last_name: 'Doe',
//     username: '@user2',
//     avatar: 'https://pbs.twimg.com/profile_images/527813822388527106/jXoqG8oL_200x200.jpeg'
// },
// {
//     user_id: 3,
//     first_name: 'Current',
//     last_name: 'User',
//     username: '@user3',
//     follows: [1,2],
//     avatar: 'https://pbs.twimg.com/profile_images/527813822388527106/jXoqG8oL_200x200.jpeg'
// }
// ];
  
const currentUser = {
user_id: 3,
first_name: 'Current',
last_name: 'User',
username: '@user3',
follows: [1,2],
avatar: 'https://pbs.twimg.com/profile_images/527813822388527106/jXoqG8oL_200x200.jpeg'
}

export const getUsers = () => async (dispatch) => { 

    let returnUsers = await (await fetch( 'http://localhost:8000/api/v1/users/' )).json();
    let payload =  { current_user: await returnUsers[0], users: await returnUsers };
            
    return  dispatch({
        type: 'GET_USERS',
        payload: await payload 
    });
}