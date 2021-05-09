import React, {useEffect, useState} from 'react';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';

const Logo = (props) => {

  const [style, setStyle] = useState({});

  useEffect(()=>{
    setStyle(props.style);
  },[]);

  return(
    <div
      className="logo"
      style={style}
    >
      <FilterHdrIcon
        fontSize="large"
        style={{
          marginTop:'15px',
          marginLeft: '85px',
          color: '#FFFFFF'
        }}
      />
      <h1
        style={{
          marginLeft: '20px',
          marginTop: 0,
          color: '#FFFFFF',
        }}
      >
        Teambase
      </h1>
    </div>
  )
}

export default Logo;
