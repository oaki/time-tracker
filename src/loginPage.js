import React from "react";

export function LoginPage(props) {
  return (
    <div>
      <label htmlFor="loginInput">Zadajte prihlasovací kód</label>
      <input type="text"/>
      <button type={"button"} onClick={()=>{
        console.log('prihlasit');
      }}>Prihlásiť</button>
    </div>
  )
}