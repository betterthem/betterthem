/* eslint-disable */

import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import './App.css';
import Data from './data.js';
import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js';
import Jumbotron from './Jumbotron.js';
import axios from 'axios';

function App() {

  let [shoes, shoesChange] = useState(Data);
  let [moreBtn, moreBtnChange] = useState(1);
  let [loading, loadingChange] = useState(0);
  let [inven, invenChange] = useState([10, 11, 12]);

  return (
    <div className="App">
      <TopMenu />
      <Switch>

        <Route exact path="/">
          <Jumbotron/>
          <div className="container">
            <div className="row">
              {
                shoes.map((obj, idx)=>{
                  return <Products to={'/detail/' + idx} shoes={obj} idx={idx} key={idx}></Products>
                })
              }
            </div>
            {
              moreBtn == 1
              ? <button className="btn btn-primary" onClick={()=>{
                loadingChange(1);
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((item)=>{
                  shoesChange( [...shoes, ...item.data] );
                  loadingChange(0);
                  moreBtnChange(0);
                })
                .catch(()=>{
                  loadingChange(0);
                  console.log('fail');
                })
                }}>더보기</button>
              : null
            }
            {
              loading == 0
              ? null
              : <div className='loading'>
                  <p>로딩중입니다.</p>
                </div> 
            }
          </div>
        </Route>

        <Route exact path="/detail/:id">
          <Detail shoes={shoes} inven={inven} invenChange={invenChange} />
        </Route>

        <Route path="/:id">
          <div>페이지를 찾을 수 없습니다.</div>
        </Route>
      </Switch>
    </div>
  );
}

function TopMenu() {
  return (
    <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">React Shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  )
}

function Products(props) {
  return (
    <Link to={'/detail/' + props.idx} className="col-md-4 item-card">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.idx + 1) + '.jpg'} width="100%"/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}, {props.shoes.price}원</p>
    </Link>
  )
}

export default App;

