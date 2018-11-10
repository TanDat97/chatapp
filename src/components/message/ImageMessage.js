import React from 'react';
import { connect } from 'react-redux';
import '../../style/message.scss';

const imageStyle = {
    marginTop: "0 px",
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(188, 188, 188)",
    userSelect: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    height: "auto",
    width: "auto",
    maxWidth: "90%",
};
  
const textWhite = {
    color: "white",
}

const ImageMessage = (props) => { 
    return (
        <div>
            <a target="_blank" rel="noopener noreferrer" style={textWhite} href={props.link}>{props.link}></a>
            <img src={props.link} style={imageStyle} alt="imageMessage"/>
        </div>
    )
}

const mapStateToProps = (state ,ownProps) => {
  return {

  }
}

const mapDispatchToProps =(dispatch) => {
  return {
      
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ImageMessage)