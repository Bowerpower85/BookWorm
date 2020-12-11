import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
    return (
      <div className="form-group">
        <input className="form-control" id="bookSearch" {...props} />
      </div>
    )
  }
  
  export function FormBtn(props) {
    return (
      <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
        {props.children}
      </button>
    )
  }