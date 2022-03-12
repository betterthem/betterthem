import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './Detail.scss';

function Detail(props) {

  let [myAlert, myAlertChange] = useState(true);

  useEffect(()=>{
    let alertTimer = setTimeout(()=>{myAlertChange(false)}, 2000);
    return ()=>{clearTimeout(alertTimer)}
  }, []);

  let { id } = useParams();
  let history = useHistory();

  let findProduct = props.shoes.find(item => item.id == id)

  return (
      <div className="container">
        <div className="page-name">
          <h4>상세페이지</h4>
        </div>
        {
          myAlert === false
          ? null
          : (<div className="my-alert-red">
              <p>재고가 얼마 남지 않았습니다</p>
            </div>)
        }
        <div className="row">
          <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes" + (findProduct.id + 1) + ".jpg"} width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{ findProduct.title }</h4>
            <p>{ findProduct.content }</p>
            <p>{ findProduct.price }원</p>
            <Inven inven={props.inven}></Inven>
            <button className="btn btn-danger" onClick={()=>{
              let countInven = [...props.inven]
              console.log(countInven);
            }}>주문하기</button> 
            <button className="btn btn-primary" onClick={()=>{history.goBack();}}>뒤로가기</button> 
          </div>
        </div>
      </div>
  )
}

function Inven(props) {
  return (
    <p>재고: {props.inven[0]}</p>
  )
}

export default Detail;