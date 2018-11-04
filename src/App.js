import React, { Component } from 'react';
import * as operations from './Operations';
import Control from './Control';
import './App.css';
import { Textfit } from 'react-textfit';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calculationValue: 0,
      inputBuffer: null,
      operation: null
    };
  }

  clear() {

    if ((this.state.inputBuffer || this.state.calculationValue) && this.state.inputBuffer != '0') {
      this.setState({
        inputBuffer: '0',
      });
    } else {
      this.setState({
        calculationValue: 0,
        inputBuffer: null,
        operation: null
      });
    }
  }

  input(value) {

    if (value == '0' &&
      (this.state.inputBuffer == '0' || this.state.inputBuffer == '-0')) return
    if (value == '.' && String(this.state.inputBuffer).indexOf(".") != -1) return;
    if (value == '.' && !this.state.inputBuffer) {
      value = '0.';
    }

    let prefix = '';

    if (this.state.inputBuffer && this.state.inputBuffer != '0') {
      prefix = this.state.inputBuffer;
    }

    if (this.state.inputBuffer == '-0') {
      prefix = '-';
    }

    this.setState({
      inputBuffer: prefix + '' + value
    })
  }

  operation(operation) {
    if (this.state.inputBuffer) {
      this.setState({
        calculationValue: (this.state.operation)
          ? operations[this.state.operation](this.state.calculationValue, this.state.inputBuffer)
          : this.state.inputBuffer,
        inputBuffer: null,
      });
    };
    this.setState({ operation: operation });
  }

  divideBy100() {
    if (this.state.inputBuffer) {
      this.setState({
        inputBuffer: parseFloat(this.state.inputBuffer) / 100
      });
    } else {
      this.setState({
        calculationValue: parseFloat(this.state.calculationValue) / 100
      });
    }
  }

  isActive(operation) {
    if (this.state.operation == operation && !this.state.inputBuffer) {
      return true;
    } else {
      return false;
    }
  }

  changeSign() {
    if (this.state.inputBuffer && this.state.inputBuffer != '0') {
      this.setState({
        inputBuffer: parseFloat(this.state.inputBuffer) * -1
      });
    } else if(this.state.calculationValue && !this.state.operation){
      this.setState({
        calculationValue: parseFloat(this.state.calculationValue) * -1
      });
    } else {
      this.setState({
        inputBuffer: '-0'
      });
    }
  }

  render() {
    return (
      <div className='calculator-wrapper'>
        <div className='display'>
          <Textfit mode="single">
            {(() => {
              if (this.state.inputBuffer) {
                return this.state.inputBuffer
              } else {
                return this.state.calculationValue
              }
            })()}
          </Textfit>
        </div>
        <div className='controls-wrapper'>
          <Control background='light-gray' onClick={() => this.clear()} >
            {(() => {
              if ((this.state.inputBuffer || this.state.calculationValue) && this.state.inputBuffer != '0') {
                return "C"
              } else {
                return "AC"
              }
            })()}
          </Control>
          <Control onClick={() => this.changeSign()} background='light-gray'>&plusmn;</Control>
          <Control onClick={() => this.divideBy100()} background='light-gray'>%</Control>
          <Control active={this.isActive('devide')} onClick={() => this.operation('devide')} background='yellow'>&divide;</Control>
          <Control onClick={() => this.input('7')}>7</Control>
          <Control onClick={() => this.input('8')}>8</Control>
          <Control onClick={() => this.input('9')}>9</Control>
          <Control active={this.isActive('product')} onClick={() => this.operation('product')} background='yellow'>&times;</Control>
          <Control onClick={() => this.input('4')}>4</Control>
          <Control onClick={() => this.input('5')}>5</Control>
          <Control onClick={() => this.input('6')}>6</Control>
          <Control active={this.isActive('substract')} onClick={() => this.operation('substract')} background='yellow'>&minus;</Control>
          <Control onClick={() => this.input('1')}>1</Control>
          <Control onClick={() => this.input('2')}>2</Control>
          <Control onClick={() => this.input('3')}>3</Control>
          <Control active={this.isActive('sum')} onClick={() => this.operation('sum')} background='yellow'>+</Control>
          <Control size='double' onClick={() => this.input('0')} controlValue='0'>0</Control>
          <Control onClick={() => this.input('.')}>.</Control>
          <Control onClick={() => this.operation(null)} background='yellow'>=</Control>
        </div>
      </div>
    );
  }
}

export default App;
