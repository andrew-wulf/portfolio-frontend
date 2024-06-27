import {Container, Row, Col, Stack, Image} from 'react-bootstrap';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';

export function Header(props) {

  return (
    <Navbar expand="lg" className="portfolio-header">
      <Container>
        <h1>Andrew's Portfolio</h1>
        <Nav.Link href="/portfolio/home"><h4>Home</h4></Nav.Link>
        <Nav.Link href="/portfolio/apps"><h4>Apps</h4></Nav.Link>
        <Nav.Link href="/portfolio/games"><h4>Games</h4></Nav.Link>
      </Container>
    </Navbar>
  )
  
}