import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Questions.css'; // Import your custom CSS file

export default function Questions({ no, name, qlist, Checked, setChecked, mode }) {
  
  useEffect(() => {
    let strs = localStorage.getItem('Checked' + no);
    if (strs === null) return;
    let item2 = [];

    for (let i = 0; i < strs.length; i++) {
      if (strs[i] === '+') {
        item2.push(strs[i] + strs[i + 1] + strs[i + 2]);
        i += 3;
      } else if (
        strs[i] !== ',' &&
        strs[i] !== '/' &&
        strs[i] !== '"' &&
        strs[i] !== '[' &&
        strs[i] !== ']' &&
        (strs[i] < 'a' || strs[i] > 'z') &&
        strs[i] !== '\\' &&
        strs[i] !== '0'
      ) {
        item2.push(strs[i]);
      }
    }

    setChecked(item2);
    console.log(item2);
    localStorage.setItem('Checked' + no, JSON.stringify(item2));
  }, [no, setChecked]);

  const handlechange = (id) => {
    const checkID = Checked.includes(id);

    if (checkID) {
      const newList = Checked.filter((idt) => idt !== id);
      setChecked(newList);
      localStorage.setItem('Checked' + no, JSON.stringify(newList));
    } else {
      setChecked([...Checked, id]);
      localStorage.setItem('Checked' + no, JSON.stringify([...Checked, id]));
    }
  };

  const handleID = (str) => {
    return str.split('').reverse().slice(1).reverse().join('');
  };

  return (
    <div className="questions-container">
      <div className="heading">
        <img className="logo" src="Sparkle.png" alt="Logo" />
        <h1 className="title">{name} Problems</h1>
      </div>
      <div className="breadcrumbs">
        <Link className="breadcrumb-link" to="/"> Topics </Link>
        <p> / {name}</p>
      </div>

      <div className="questions-table">
        <table>
          <tr className="table-header">
            <th>ID</th>
            <th>Question(s)</th>
            <th>Status</th>
            <th>Done</th>
          </tr>
          {qlist.map((ele) => (
            <tr className={Checked.includes(ele.ID) ? 'checked-row' : ele.ID % 2 === 0 ? 'even-row' : 'none'}>
              <td className="question-id">
                {ele.ID[0] === '+' ? handleID(ele.ID) : ele.ID}
              </td>
              <td className="question-text">
                <Link target="_blank" to={ele.link}>
                  {ele.Q}
                </Link>
              </td>
              <td className="status-icon">
                {Checked.includes(ele.ID) ? (
                  <img className="checked-icon" src="https://cdn.pixabay.com/photo/2012/04/24/16/22/check-40319_960_720.png" alt="Checked" />
                ) : (
                  <img className="unchecked-icon" src="https://th.bing.com/th/id/OIP.2Ef1V0Yr3Lv_CZLcXBBt3gHaHa?pid=ImgDet&rs=1" alt="Unchecked" />
                )}
              </td>
              <td className="checkbox">
                <input type="checkbox" onChange={() => handlechange(ele.ID)} checked={Checked.includes(ele.ID)} />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
