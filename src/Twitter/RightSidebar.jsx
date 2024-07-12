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
        <h1>test</h1>
      </div>
    </div>
  )
}