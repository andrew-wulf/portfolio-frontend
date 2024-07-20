
import axios from 'axios';
import { useState, useEffect } from 'react';


import { TweetsIndex } from './TweetsIndex.jsx';
import { Loading } from '../Loading.jsx';
import { NewTweet } from './NewTweet.jsx';


export function Timeline(props) {
  let user = props.user;

  const [tweets, setTweets] = useState([]);

  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const [moreTweetsLeft, setMoreTweetsLeft] = useState(true);
  const [loading, setLoading] = useState(false);



  const getUserTimeline = () => {
    axios.get('http://localhost:3000/tweets/timeline.json', {params: {offset: 0, limit: 20}})
      .then(response => {
        console.log(response);
        //let output = [];
       // output.push(response.data)
        setTweets(response.data);
  
      })
      .catch(error => {
        console.log(error);
      });
  }

  const getMoreTweets = (page) => {
    axios.get('http://localhost:3000/tweets/timeline.json', {params: {offset: (offset + (page - 1) * 20), limit: 20}})
      .then(response => {
        console.log(response);
   
        if (response.data.length === 0) {
          setMoreTweetsLeft(false)
        }
        else {
          setMoreTweetsLeft(true);
          appendTweets(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  const appendTweets = (data) => {
    let output = tweets;

    for (let j = 0; j < data.length; j++) {
      let row = data[j];
      let unique = true;
      let i = 0;
      while (i < output.length) {

        if (output[i].id === row.id) {
          console.log('match: ' + row.id)
          unique = false;
          break
        }
        i++;
      }
      if (unique) {output.push(row)}
    }

    console.log(output);
    setTweets([...output]);
    setLoading(false);
  }

  const handlePageLoad = () => {
    getUserTimeline();
  }
  useEffect(handlePageLoad, []);



  




  useEffect(() => {
    if (tweets.length > 0) {
      let content = document.getElementsByClassName('content')[0];
      content.addEventListener('scroll', handleScroll);
      return () => {content.removeEventListener('scroll', handleScroll)}
    }
  })

  
  const handleScroll = () => {
    console.log(loading)
    let timeline = document.getElementsByClassName('tweets-index')[0];
    let content = document.getElementsByClassName('content')[0];
    if (timeline) {

      if (content.scrollTop > (timeline.scrollHeight - 1400) && loading === false) {
        setLoading(true);
        handleScrollLimit();
      }
    }
  }


  const handleScrollLimit = () => {
    getNextPage();
    console.log('loading...')
  }


  const getNextPage = () => {
    if (moreTweetsLeft) {
      setPage((page + 1));
      getMoreTweets(page + 1);
    }
  }


  const handleSubmit = (tweet) => {
    let newArr = [tweet];
    newArr.push(...tweets);
    setTweets(newArr);
    setOffset(offset + 1);
  }
  



  let tweetLoading = <></>;
  if (loading) {
    tweetLoading = <div className='spinner-container'>
                      <div className='simple-spinner'></div>
                    </div>
  }

  console.log(tweets)
  if (tweets.length > 0) {
    return (
      <div>
        <div className='timeline-top-bar'/>
        <div className='timeline-new-tweet'>
          <NewTweet user={user} onSubmit={handleSubmit} minHeight={40}/>
        </div>

        <div className='tweets-index'>
          <TweetsIndex tweets={tweets}/>
        </div>
        
        {tweetLoading}
      </div>
    )
  }

  else {
    if (moreTweetsLeft) {
    return (<Loading />)
  }
    else {
      return (
        <div className='flex justify-content-center'> 
          <h3>No tweets found.</h3>
        </div>
      )
    }
  }
}