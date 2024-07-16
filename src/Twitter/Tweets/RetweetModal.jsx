export function RetweetModal(props) {


  if (props.show) {

    let msg = 'Retweet';

    if (props.retweeted) {msg = 'Undo Retweet'}

    return (
      <>
        <div className="retweet-modal-bg" onClick={props.onClose}>
        </div>
        <div className="retweet-modal-main">
          <div onClick={(e) => {e.stopPropagation(); props.handleRetweet(); props.onClose(e)}}>
            {msg}
          </div>

          <div onClick={(e) => {e.stopPropagation(); props.handleQuote(); props.onClose(e)}}>
            Quote
          </div>
       
        </div>
      </>
  
    )
  }
}