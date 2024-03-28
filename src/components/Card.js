import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import image from "../assests/images.png";

export default function Card({ name, no, qno }) {
  // eslint-disable-next-line
  let op = JSON.parse(localStorage.getItem('Checked' + `${no}`));
  let kk = 0;
  if (op !== null) {
    op = [...new Set(op)];
    for (let i = 0; i < op.length; i++) {
      if ((op[i] !== ',' && op[i] !== '/' && op[i] !== '"' && op[i] !== '[' && op[i] !== ']' && (op[i] < 'a' || op[i] > 'z') && op[i] !== "\\" && op[i] !== '+') || op.length === 3) { kk++; }
    }
  }
  let ans = op !== null ? kk : 0;

  return (
    <Link to={name} className="card-link">
      <div className={Math.round((ans * 100) / qno) !== 100 ? "card" : "card card-finished"}>
        <img className='card-image' src={image} alt="React Logo"></img>
        <div className='card-content'>
          <h2 className='card-title'>{name}</h2>
          <h4 className='card-info'>Total Questions: {qno}</h4>
          {
            ans === 0 ?
              <h6 className='card-status'>Not Yet Started</h6> :
              Math.round((ans * 100) / qno) !== 100 ?
                <div className="progress-container">
                  <h6 className='card-status'>STARTED</h6>
                  <img src="https://th.bing.com/th/id/R.15e3df2a05ac767df4359bf37707b781?rik=YoELJf68lvMxWQ&riu=http%3a%2f%2fs3.amazonaws.com%2fpix.iemoji.com%2fimages%2femoji%2fapple%2fios-11%2f256%2fman-technologist-light-skin-tone.png&ehk=uinI8ak5dKPQXLDnNbEcTr%2bSuymPLXBS%2bBPUBpPLgcI%3d&risl=&pid=ImgRaw&r=0" className='progress-icon' alt="Started"></img>
                  <h6 className='progress-percent'>{Math.round((ans * 100) / qno)}%</h6>
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${Math.round((ans * 100) / qno)}%` }}></div>
                  </div>
                </div>
                :
                <div className="progress-container">
                  <h6 className='card-status'>FINISHED</h6>
                  <img src="https://cdn.shopify.com/s/files/1/1061/1924/products/Clapping_Hands_Emoji_ios10_d7ab242e-7230-47bf-b1e2-d46a4bc51b5b_grande.png?v=1571606090" className='progress-icon' alt="Finished"></img>
                  <h6 className='progress-percent'>100%</h6>
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: '100%' }}></div>
                  </div>
                </div>
          }
        </div>
      </div>
    </Link>
  )
}
