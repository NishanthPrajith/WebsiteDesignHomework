import './calculator.css';

import { useState } from 'react';

export default function Calculator() {

    const [current, setCurrent] = useState("");
    const [check, setCheck] = useState(true);
    const [formula, setFormula] = useState("");
    const [prevInput, setPrevInput] = useState("");
    const [plusMinus, setPlusMinus] = useState("");
    const [color, setColor] = useState(0);

    function calculate(a) {
        if (a === "AC") {
            setCurrent("");
            setCheck(true);
            setPlusMinus("");
            setPrevInput("");
            setFormula("");
            changeColor("");
        } else if (a === "+/-") {
            if (plusMinus === "") {
                setPlusMinus("-");
                setCurrent("-" + current);
            } else {
                setPlusMinus("");
                setCurrent(current.substring(1));
            }
        } else if (a === "/" || a === "*" || a === "-" || a === "+") {
            if (formula === "") {
                setFormula(a);
                changeColor(a);
            } else if (formula !== "" && prevInput === "") {
                setFormula(a);
                changeColor(a);
            } else {
                var c = arithmetic(prevInput, current, formula);
                if (c < 0) {
                    setPlusMinus("-");
                }
                setCurrent(c.toString());
                setPrevInput("");
                setFormula(a);
                changeColor(a);
            }
        } else if (a === ".") {
            if (check) {
                setCurrent(current + a);
            }
            setCheck(false);
        } else if (a === "%") {
            var h = parseFloat(current);
            var a = h / 100;
            if (a % 1 !== 0) {
                setCheck(false);
            }
            setCurrent(a.toString());
        } else if (a === "=") {
            var c = arithmetic(prevInput, current, formula);
            if (c < 0) {
                setPlusMinus("-");
            }
            setCurrent(c.toString());
            changeColor("");
            setPrevInput("");
            setFormula("");
        } else {
            if (formula !== "" && prevInput === "") {
                setPrevInput(current);
                setPlusMinus("");
                setCheck(true);
                setCurrent(a);
                changeColor("");
            } else {
                setCurrent(current + a);
            }
        }
    }

    function arithmetic(prevInput, current, formula) {
        console.log("Formula", formula);
        var g = parseFloat(prevInput);
        var h = parseFloat(current);
        var b = 0.0;
        if (formula === "+") {
            b = g + h;
        } else if (formula === "-") {
            b = g - h;
        } else if (formula === "*") {
            b = g * h;
        } else if (formula === "/") {
            b = g / h;
        }
        if (b % 1 !== 0) {
            b = b.toFixed(3);
            setCheck(false);
        } else {
            b = b.toFixed(0);
        }
        return b;
    }

    function changeColor(x) {
        if (x === "/") {
            setColor(1);
        } else if (x === "*") {
            setColor(2);
        } else if (x === "-") {
            setColor(3);
        } else if (x === "+") {
            setColor(4);
        } else {
            setColor(0);
        }
        console.log("Color", color)
    }

    return (
        <div className="mainContent">
            <p className="homeworkTitle">
                Billy Davilla, Mark Natvio, Sanjida Nisha & Nishanth Prajith
            </p>
            <p style={{width: "100%", textAlign: "center", marginTop: "2%"}}>
                Website Design Homework in React.js
            </p>
            <div className="inputText">
                <p>{current === "" ? "0" : current}</p>
            </div>
            <div className="buttons">
                <button className="AC" onClick={() => {calculate('AC')}}>AC</button>
                <button className="minusPlus" onClick={() => {calculate('+/-')}}>+/-</button>
                <button className="percent" onClick={() => {calculate('%')}}>%</button>
                <button className="division" style={color === 1 ? {backgroundColor: "var(--cream)"} : {backgroundColor: "var(--orange)"}} 
                    onClick={() => {calculate('/')}}>/</button>
                <button className="seven" onClick={() => {calculate('7')}}>7</button>
                <button className="eight" onClick={() => {calculate('8')}}>8</button>
                <button className="nine" onClick={() => {calculate('9')}}>9</button>
                <button className="multi" style={color === 2 ? {backgroundColor: "var(--cream)"} : {backgroundColor: "var(--orange)"}}
                    onClick={() => {calculate('*')}}>*</button>
                <button className="four" onClick={() => {calculate('4')}}>4</button>
                <button className="five" onClick={() => {calculate('5')}}>5</button>
                <button className="six" onClick={() => {calculate('6')}}>6</button>
                <button className="minus" style={color === 3 ? {backgroundColor: "var(--cream)"} : {backgroundColor: "var(--orange)"}}
                    onClick={() => {calculate('-')}}>-</button>
                <button className="one" onClick={() => {calculate('1')}}>1</button>
                <button className="two" onClick={() => {calculate('2')}}>2</button>
                <button className="three" onClick={() => {calculate('3')}}>3</button>
                <button className="add" style={color === 4 ? {backgroundColor: "var(--cream)"} : {backgroundColor: "var(--orange)"}}
                    onClick={() => {calculate('+')}}>+</button>
                <button className="zero" onClick={() => {calculate('0')}}>0</button>
                <button className="dot" onClick={() => {calculate('.')}}>.</button>
                <button className="equals" onClick={() => {calculate('=')}}>=</button>
            </div>
        </div>
    )
}