import React from 'react';
import {TweetFormComponent} from './TweetFormComponent';
import {connect, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addTweet} from '../../actions/tweetActions';
import {addHashtag, getHashtags, updateHashtags} from '../../actions/hashtagActions';
import {findNewHashtagsInTweet, replaceHashtagsWithLinks, findOldHashtagsInTweet, replaceMentions, deFormatOldHashtag} from './helperFunctions';

class TweetFormContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {users: [] , formContent: ''}; //Initialize empty state
        this.newTweet = {tweetContent: '', existingHashtags: [], newHashtags: []};
    }

    getHashtags = () => {
        return useSelector(state => state.stateHashtags.hashtags);
    }

    getUsers = () => {
        return useSelector(state => state.stateUsers.users.users);
    }

    onTweetSubmit = () => {
        
        
        //this.setState({...this.state , formContent: ''});

        if (this.state.formContent !== '') {
            this.processTweet();
            this.submitTweet();
        }
    }  

    processTweet = () => {
        let tweetContent = this.state.formContent;
        let newHashtags, existingHashtags = [];

        //Remove white spaces at beggining and end of tweet
        tweetContent = tweetContent.trim();

        //Replace user mentions with <a></a> elements
        tweetContent = replaceMentions(tweetContent);

        //Find new hashtags inside tweet
        newHashtags = findNewHashtagsInTweet( tweetContent );

        //Find old hashtags inside tweet
        existingHashtags = findOldHashtagsInTweet( tweetContent );

        //Replace hashtags with <a></a> elements
        tweetContent = replaceHashtagsWithLinks( tweetContent, newHashtags, existingHashtags );

        //Modify the new tweet object
        this.newTweet.tweetContent = tweetContent;
        this.newTweet.existingHashtags = existingHashtags;
        this.newTweet.newHashtags = newHashtags;
    }

    //TODO: Refactor this
    submitTweet = async () => {
        const res = await this.props.addTweet( this.newTweet.tweetContent );
        const latestTweetID = await res.payload.latestPost._id;

        if( this.newTweet.existingHashtags ) {
            //Update existing hashtags tweet table and postcount
            await this.props.updateHashtags( latestTweetID, this.newTweet.existingHashtags.map( item => deFormatOldHashtag(item)));
        }
        if( this.newTweet.newHashtags ) {
            
            this.addNewHashtagsToDB( latestTweetID, this.newTweet.newHashtags);
        }
    }

    //TODO: Refactor this
    addNewHashtagsToDB = async (latestTweetID, hashtags) => {
        let uniqueHashtagsArray = Array.from(new Set(hashtags));
        
        //Map the hashtags to an array of objects to make them ready for insertion
        let mapHashtagsForInsertion = uniqueHashtagsArray.map( hashtag => {
            return {
                title: hashtag,
                title_clean: hashtag.substr(1),
                tweets: [latestTweetID]
            }
        });

        this.props.addHashtag( mapHashtagsForInsertion )
            .then( res => console.log(res));
    }

    handleChange = (e) => {
        this.setState({...this.state , formContent: e.target.value});
    }

    mapStateUsersToSuggestionData = () => {
        return this.getUsers().map( user => { return { id: user._id , display: user.username ? user.username : user.first_name , avatar: user.avatar } } );
    }

    mapStateHashtagsToSuggestionData = () => {
        return this.getHashtags().map( hashtag => { return { id: hashtag._id , display: hashtag.title_clean, hashtag: hashtag.title  } } );
    }

    render() {
        return(
            <div> 
            {
            this.props.stateUsers.current_user && this.props.stateHashtags ?
                <TweetFormComponent 
                    stateUsers          = {this.props.stateUsers}//These are the store users
                    state               = {this.state}//This the state of textarea
                    handleChange        = {this.handleChange}
                    onTweetSubmit             = {this.onTweetSubmit}  
                    mapStateUsersToSuggestionData = {this.mapStateUsersToSuggestionData}  
                    mapStateHashtagsToSuggestionData = {this.mapStateHashtagsToSuggestionData}
                >
                </TweetFormComponent>
            :
            ''
            }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ addTweet , addHashtag, getHashtags, updateHashtags }, dispatch);
const mapStateToProps = state => { return { stateUsers: state.stateUsers.users , statePosts: state.statePosts.posts, stateHashtags: state.stateHashtags.hashtags }};
  
export default connect(mapStateToProps , mapDispatchToProps)(TweetFormContainer)