import React, { useState } from 'react';
import { View } from 'react-native';
import { Boton, Caja } from './Atomicos';
import { estilos } from './Estilos';

const Calculadora = () => {
  const [screenValue, setScreenValue] = useState('0');
  const [prevValue, setPrevValue] = useState('');

  const handleBotonClick = (value) => {
    if (value === 'C') {
      clearScreen();
    } else if (value === '<-') {
      deleteLastCharacter();
    } else if (value === '=') {
      calculateResult();
    } else {
      appendToScreen(value);
    }
  };

  const appendToScreen = (value) => {
    if (value === '+' || value === '-' || value === '*' || value === '/') {
      if (prevValue !== '') {
        calculateResult();
      }
      setPrevValue(screenValue + value);
      setScreenValue('');
    } else if (value === '+/-') {
      setScreenValue((prevValue) => {
        if (prevValue === '0') {
          return '0';
        }
        if (prevValue.startsWith('-')) {
          return prevValue.substring(1);
        } else {
          return '-' + prevValue;
        }
      });
    } else if (value === '%') {
      const currentValue = parseFloat(screenValue);
      const result = currentValue / 100;
      setScreenValue(result.toString());
    } else if (value === '√') {
      const currentValue = parseFloat(screenValue);
      if (currentValue >= 0) {
        const result = Math.sqrt(currentValue);
        setScreenValue(result.toString());
      } else {
        setScreenValue('Error');
      }
    } else if (value === 'x²') {
      const currentValue = parseFloat(screenValue);
      const result = currentValue * currentValue;
      setScreenValue(result.toString());
    } else if (value === '1/x') {
      const currentValue = parseFloat(screenValue);
      if (currentValue !== 0) {
        const result = 1 / currentValue;
        setScreenValue(result.toString());
      } else {
        setScreenValue('Error');
      }
    } else {
      setScreenValue((prevValue) => {
        if (screenValue === '0' || /[*/+-]$/.test(prevValue)) {
          return value;
        }
        if (value === '.' && /\d*\.\d*$/.test(prevValue)) {
          return prevValue;
        }
        if (value === '.' && /^[*/+-]$/.test(prevValue)) {
          return prevValue + '0' + value;
        }
        if ((value === '+' || value === '-') && !/^[*/+-.]$/.test(prevValue)) {
          return value + prevValue;
        }
        return prevValue + value;
      });
    }
  };
  
  const calculateResult = () => {
    try {
      const result = eval(prevValue + screenValue);
      setScreenValue(result.toString());
      setPrevValue('');
    } catch (error) {
      setScreenValue('Error');
    }
  };

  const clearScreen = () => {
    setScreenValue('0');
    setPrevValue('');
  };

  const deleteLastCharacter = () => {
    setScreenValue((prevValue) => {
      return prevValue.slice(0, -1);
    });
  };

  return (
    <View style={estilos.contenedor}>
      <Caja valor={screenValue} />
      <View style={estilos.calculadoraEstilo}>
        <View style={estilos.fila}>
          <Boton texto={'%'} accion={() => handleBotonClick('%')} />
          <Boton texto={'CE'} accion={() => handleBotonClick('C')} />
          <Boton texto={'C'} accion={() => handleBotonClick('C')} />
          <Boton texto={'<-'} accion={() => handleBotonClick('<-')} />
        </View>
        <View style={estilos.fila}>
          <Boton texto={'1/x'} accion={() => handleBotonClick('1/x')} />
          <Boton texto={'x²'} accion={() => handleBotonClick('x²')} />
          <Boton texto={'√'} accion={() => handleBotonClick('√')} />
          <Boton texto={'/'} accion={() => handleBotonClick('/')} />
        </View>
        <View style={estilos.fila}>
          <Boton texto={'7'} accion={() => handleBotonClick('7')} />
          <Boton texto={'8'} accion={() => handleBotonClick('8')} />
          <Boton texto={'9'} accion={() => handleBotonClick('9')} />
          <Boton texto={'*'} accion={() => handleBotonClick('*')} />
        </View>
        <View style={estilos.fila}>
          <Boton texto={'4'} accion={() => handleBotonClick('4')} />
          <Boton texto={'5'} accion={() => handleBotonClick('5')} />
          <Boton texto={'6'} accion={() => handleBotonClick('6')} />
          <Boton texto={'-'} accion={() => handleBotonClick('-')} />
        </View>
        <View style={estilos.fila}>
          <Boton texto={'1'} accion={() => handleBotonClick('1')} />
          <Boton texto={'2'} accion={() => handleBotonClick('2')} />
          <Boton texto={'3'} accion={() => handleBotonClick('3')} />
          <Boton texto={'+'} accion={() => handleBotonClick('+')} />
        </View>
        <View style={estilos.fila}>
          <Boton texto={'+/-'} accion={() => handleBotonClick('+/-')} />
          <Boton texto={'0'} accion={() => handleBotonClick('0')} />
          <Boton texto={'.'} accion={() => handleBotonClick('.')} />
          <Boton texto={'='} accion={() => handleBotonClick('=')} />
        </View>
      </View>
    </View>
  );
};

export default Calculadora;
