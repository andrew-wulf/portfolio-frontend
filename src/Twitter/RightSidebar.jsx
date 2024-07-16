import { Form } from "react-bootstrap"


export function RightSidebar(props) {

  return (
    <div className="right-sidebar">
      <div className='right-sidebar-content'>
        <Form >
          <Form.Control
            type="text"
            placeholder="Search"
            className=" mr-sm-2"
            style={{'borderRadius': '25px'}}
          />
        </Form>
        
        <div className="user-suggestions">
            <div className="might-like">
              <h4>You Might Like</h4>
              <p>test</p>
              <p>test</p>
              <p>test</p>
            </div>
  
            <div className="whats-happening">
              <h4>What's Happening</h4>
                <p>test</p>
                <p>test</p>
                <p>test</p>
            </div>
          </div>
      </div>
    </div>
  )
}