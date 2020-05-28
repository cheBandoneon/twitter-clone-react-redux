import {useSelector} from 'react-redux';
import HomeFeed from './HomeFeed';

export const HomeFeedContainer = () => {
    
    const items = useSelector(state => state.statePosts);
    const users = useSelector(state => state.stateUsers.users);

    return HomeFeed(items, users);
}
  
export default HomeFeedContainer;