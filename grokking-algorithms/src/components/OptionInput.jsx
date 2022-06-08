import React from 'react';

class OptionInput extends React.Component {
   render(){
       const { valores, onChange, item } = this.props;
       return(
            <label htmlFor="optValue">
                Escolha seu numero:
                <select
                id="optValue"
                name="valorFind"
                value={ item }
                onChange={ onChange }
                >
                    {valores.map((valor, index)=>(
                        <option key={ index } value={valor}>{valor}</option>
                    ))}
                </select>
            </label>
       )
   }
}

export default OptionInput;
