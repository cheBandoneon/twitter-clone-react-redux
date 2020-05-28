/**
 * Replaces mention templates with links that point to the mentioned user page
 * 
 * @param {String} tweetContent 
 * @return {String} The content with the mention templates replaced 
 */
export const replaceMentions = tweetContent => {
    tweetContent = tweetContent.split('@@@__').join("<a href=\"/user/");
    tweetContent = tweetContent.split('^^__').join("\">@");
    tweetContent = tweetContent.split('@@@^^^').join('</a>');
    return tweetContent;
}


/**
 * Match new hashtags. That means hashtags that are in front of sentence or have a space before them.
 * We need the space to distinguish them from the old hashtags, which are already in the form
 * <a href="/#hashtag">#hashtag</a> 
 * 
 * @param {String} tweetContent 
 * @return {Function} -> removeSpacesFromNewHashtagsArray
 */
export const findNewHashtagsInTweet = tweetContent => {
    let matches = tweetContent.match(/(^|\s)(#[a-zA-Z\-_\d-]+)/g);
    if( matches )
        return removeSpacesFromNewHashtagsArray(matches);
}

/**
 * Finds old hashtags in tweet. 
 * 
 * @param {String} tweetContent
 * @return {Array} The array of matches 
 */
export const findOldHashtagsInTweet = tweetContent => {
    let matches = tweetContent.match(/##\w+##/g);
    return matches;
}

/**
 * The hashtags array may have some items that have a space at the first character. 
 * We need to remove that space.
 * 
 * @param {Array} matches 
 * @return {Array} The array with the hashtags with spaces removed
 */
export const removeSpacesFromNewHashtagsArray = matches => {
    return matches.map( item => item.charAt[0] === ' ' ? item.substr(1) : item )
}

export const deFormatOldHashtag = oldHashtag => {
    oldHashtag = oldHashtag.substr(2);
    oldHashtag = oldHashtag.substr(0, (oldHashtag.length - 2));
    return oldHashtag;
}

/**
 * Replace hashtags in tweetContent with the format <a href="hashtag">#hashtag</a>
 * New hashtags format: #hashtag
 * Old hashtags format: ##hashtag##
 * 
 * @param {String} tweetContent 
 * @param {Array} tweetContentHashtags 
 * @return {String} 
 */
export const replaceHashtagsWithLinks = (tweetContent, newHashtags, oldHashtags) => {
    
    //First Replace the new hashtags
    if( newHashtags ) {
        newHashtags.forEach(newHashtag =>{
            //Remove the # at the start of hashtag, for url use 
            let newHashtagUrlFriendly = newHashtag.substr(0);
            //Replace all #hashtag occurences with <a href="hashtag">#hashtag</a> format
            tweetContent = tweetContent.split(newHashtag).join(`<a href="/hashtag/${newHashtagUrlFriendly}">${newHashtag}</a>`);
        });
    }

    //Then Replace the old hashtags 
    if( oldHashtags ) {
        oldHashtags.forEach(oldHashtag => {
            //Old hashtags have the format ##hashtag## so we need to strip the hashes
            let oldHashtagUrlFriendly = deFormatOldHashtag(oldHashtag);
            tweetContent = tweetContent.split(oldHashtag).join(`<a href="/hashtag/${oldHashtagUrlFriendly}">#${oldHashtagUrlFriendly}</a>`);
        });
    }

    return tweetContent;
}