import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [productList,setProductList]=useState([]);
  // console.log(productList);
  const [pid,setPid]=useState('');
  const [pname,setPname]=useState('');
  const [price,setPrice]=useState('');
  
  useEffect(()=>{
    Axios.get('http://localhost:5000/api/prod').then((res)=>setProductList(res.data)).catch((err)=>console.log(err))
  });

  const handleSubmit=(e)=>{
    e.preventDefault();
    Axios.post('http://localhost:5000/api/save',{
      pid:pid,
      pname:pname,
      price:price
      }).then(()=>alert("posted")).catch((err)=>console.log(err))

      setPid('');
      setPname('');
      setPrice('');
  }
  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
          <div className="forminput">
          <label htmlFor="id">product Id: </label>
          <input type="text" name="pid" value={pid} onChange={(e)=>setPid(e.target.value)} />
          </div>
          <div className="forminput">
          <label htmlFor="id">product Name: </label>
          <input type="text" name="pname" value={pname} onChange={(e)=>setPname(e.target.value)} />
          </div>
          <div className="forminput">
          <label htmlFor="id">product Price: </label>
          <input type="text" value={price} name="price"  onChange={(e)=>setPrice(e.target.value)} />
          </div>
          <input type="submit" value="save" />
      </form>  
      <div className="tabo">
        <table className="tab">
          <tr>
                <th className="pid">Pid</th>
                <th className="pname">Pname</th>
                <th className="price">Price</th>
          </tr>
          {
            productList.map((val)=>{
              return(
                <tr>
                  <td className="pid">{val.pid}</td>
                  <td className="pname">{val.pname}</td>
                  <td className="price">{val.price}</td>
                </tr>
              )
            })
          }
        </table>
      </div>
    </div>
  );
}

export default App;
