import React from 'react';
import './tweetForm.scss';
import { MentionsInput, Mention } from 'react-mentions'

export const TweetFormComponent = props => {

    const tweetAuthorImageStyle = {
        backgroundImage : `url( ${props.stateUsers.current_user.avatar})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center' 
    }
    
    return (
        <div className = "tweet-form">
            <div className = "tweet-form__avatar" style = { tweetAuthorImageStyle }></div>
            <MentionsInput 
                value       = {props.state.formContent} 
                onChange    = {props.handleChange}  
                placeholder = {'What\'s happening?'}
            >
                <Mention 
                    type             = 'usermention'
                    trigger          = '@'
                    data             = {props.mapStateUsersToSuggestionData()}
                    displayTransform = {(id,display) => `@${display}`}
                    markup           = '@@@____id__^^____display__@@@^^^'
                    renderSuggestion = {(
                        suggestion,
                        search,
                        highlightedDisplay,
                        index,
                        focused
                        ) => (
                        <div className={`suggestion user ${focused ? 'focused' : ''}`}>
                            <img className="suggestion__avatar" src={suggestion.avatar}></img> @{suggestion.display}
                        </div>
                        )}
                    style            = {{ backgroundColor: '#f2fcfb' , left: '3px' , top: '5px' , position: 'relative' }}
                />
                <Mention 
                    type             = 'hashtag'
                    trigger          = '#'
                    data             = {props.mapStateHashtagsToSuggestionData()}
                    displayTransform = {(display) => `#${display}`}
                    markup           = '##__display__##'
                    renderSuggestion = {(
                        suggestion,
                        search,
                        highlightedDisplay,
                        index,
                        focused
                        ) => (
                        <div className={`suggestion hashtag ${focused ? 'focused' : ''}`}>
                            {suggestion.hashtag}
                        </div>
                    )}
                    style            = {{ backgroundColor: '#f2fcfb' , left: '3px' , top: '5px' , position: 'relative' }}
                />
            </MentionsInput>
            <div className = "tweet-form__foot">
                <button className = "tweet-form__submit btn--primary" onClick = {props.onTweetSubmit}>Tweet</button>
            </div>
        </div>
    );
}