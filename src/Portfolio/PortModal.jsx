import { Gallery } from "./Gallery";



export function PortModal(props) {


  if (props.show) {
    return (
      <div onClick={props.onClose} className="port-modal-background">
        <section onClick={(e) => {e.stopPropagation();}} className="port-modal">

            <button className="port-modal-close" type="button" onClick={props.onClose}>
              &#x2715;
            </button>

            <Gallery close={props.onClose} isModal={true} imgs={props.imgs} descriptions={props.descriptions}/>

        </section>
      </div>
    );
  }
}