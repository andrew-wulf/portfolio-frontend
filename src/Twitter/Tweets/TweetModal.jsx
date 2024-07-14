
import "../css/tweetmodal.css"
import { NewTweet } from "./NewTweet";



export function TweetModal(props) {
  let user = props.user;

  const handleSubmit = (id) => {
    props.onClose();
    window.location.href = `/twitter/tweet/${id}`
  }


  if (props.show) {
    return (
      <div className="modal-background">
        <section className="modal-main">
          {props.children}
          <button className="close" type="button" onClick={props.onClose}>
            &#x2715;
          </button>

          <NewTweet user={user} onSubmit={handleSubmit} minHeight={100}/>
        </section>
      </div>
    );
  }
}