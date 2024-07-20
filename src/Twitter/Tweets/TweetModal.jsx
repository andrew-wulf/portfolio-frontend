
import "../css/tweetmodal.css"
import { NewTweet } from "./NewTweet";



export function TweetModal(props) {
  let user = props.user;

  const handleSubmit = (tweet) => {
    props.onClose();

    if (window.location.href.includes("/twitter/home")) {
      window.location.reload();
    }
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