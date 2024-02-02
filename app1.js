let inputVal = "";
        let arrayValuesDisplay = [];
        let arrayValuesCalculate = [];
        let ans = 0;

        function insert(inputVal) {

        }
        function roundToDecimal(value, decimalPlaces) {
            const factor = 10 ** decimalPlaces;
            return Math.round(value * factor) / factor;
        }

        function insertResult(result) {
            document.querySelector("#result").innerHTML = "=";
            document.querySelector("#result").insertAdjacentHTML("beforeend", `${result}`);
        }
        function toRadians(degrees) {
            return degrees * (Math.PI / 180);
        }
        function handleSpecialCases(e) {
            if (
                (e.target.classList[1] !== 'btn-num' &&
                    e.target.classList[1] !== 'btn-dot' &&
                    e.target.classList[1] !== 'btn-del') &&
                e.target.classList[2] !== 'btn-sign'
            ) {
                if (modeOnlyDigitKey === 1) {
                    console.log('entered EXP mode check?');
                    arrayValuesCalculate.push('*1)');
                    arrayValuesDisplay.push('</sup>');
                    modeOnlyDigitKey = 0;
                }
            }
        }
        function factorialCalculate(num) {
            if (num === 0 || num === 1) {
                return 1;
            } else {
                return num * factorialCalculate(num - 1);
            }
        }

        document.querySelector("#buttons").addEventListener('click', (e) => {

            console.log(e.target.classList[1]);
            if (e.target.classList[1] === 'btn-num') {
                arrayValuesCalculate.push(e.target.innerText * 1);
                arrayValuesDisplay.push(e.target.innerText * 1);
            }

            if (e.target.classList[2] === 'btn-sign') {
                changeSign();
            }

            if (e.target.classList[1] === "btn-dot") {
                const lastNumber = arrayValuesCalculate[arrayValuesCalculate.length - 1];
                if (!lastNumber.toString().includes('.')) {
                    arrayValuesCalculate.push('.');
                    arrayValuesDisplay.push('.');
                }
            }

            // Check if EXP mode activate:
            checkEXPMode(e);

            if (e.target.classList[1] === 'btn-special' && e.target.classList[3] != 'btn-none') {
                arrayValuesDisplay.push(e.target.innerText);
            
                if (e.target.classList[2] == 'btn-alg' && ['sin', 'cos', 'tan'].includes(e.target.classList[3])) {
                    arrayValuesCalculate.push(`Math.${e.target.classList[3]}(toRadians(`);
                    arrayValuesDisplay.push(`(`);
                }else if (e.target.classList[2] == 'btn-alg'&& ['log10', 'log'].includes(e.target.classList[3])) {
                    arrayValuesCalculate.push(`Math.${e.target.classList[3]} `);
                    arrayValuesCalculate.push('(');
                    arrayValuesDisplay.push('(');
                }else if (e.target.classList[2] == 'btn-mult') {
                    arrayValuesCalculate.push('*');
                } else if (e.target.classList[2] == 'btn-sqrt') {
                    arrayValuesCalculate.push('Math.sqrt(');
                    arrayValuesDisplay.push('(');
                } else if (e.target.classList[2] == 'btn-PI') {
                    arrayValuesCalculate.push('Math.PI ');
                } else if (e.target.classList[2] == 'btn-E') {
                    arrayValuesCalculate.push('Math.E ');
                } else if (e.target.classList[2] == 'btn-%') {
                    arrayValuesCalculate.push('/100');
                } else {
                    arrayValuesCalculate.push(e.target.innerText);
                }
            }

            if (e.target.classList[2] == 'btn-EXP') {
                arrayValuesCalculate.push('*10** (1* ');
                arrayValuesDisplay.push("x10<sup>");
                modeOnlyDigitKey = 1;
            }
            if (e.target.classList[2] === 'btn-exp1') {
                arrayValuesCalculate.push('**(-1)');
                //insert('⁻¹');        
                arrayValuesDisplay.push('⁻¹');        

            }
            if (e.target.classList[2] === 'btn-exp2') {
                arrayValuesCalculate.push('**(2)');
                //insert('³');
                arrayValuesDisplay.push('<sup>2</sup>');
            
            }
            if (e.target.classList[2] === 'btn-exp3') {
                arrayValuesCalculate.push('**(3)');
                //insert('³');
                arrayValuesDisplay.push('<sup>3</sup>');
            }
            
            if (e.target.classList[2] === 'btn-pow') {
                arrayValuesCalculate.push('**');
                arrayValuesDisplay.push('^');
            }

            if (e.target.classList[2] === 'btn-!') {
                arrayValuesCalculate.push('factorialCalculate(');
                arrayValuesDisplay.push('!');
              }
            
            updateDisplay();
        });

        let modeOnlyDigitKey = 0;

        function checkEXPMode(e) {
            if ((e.target.classList[1] != 'btn-num' &&
                e.target.classList[1] != 'btn-dot' &&
                e.target.classList[1] != 'btn-del') &&
                e.target.classList[2] != 'btn-sign') {
                if (modeOnlyDigitKey == 1) {
                    console.log('entered EXP mode check?');
                    arrayValuesCalculate.push('*1)');
                    arrayValuesDisplay.push("</sup>");
                    modeOnlyDigitKey = 0;
                };
            }
        }
        function updateDisplay() {
            if (arrayValuesCalculate[arrayValuesCalculate.length - 2] === '*' && arrayValuesCalculate[arrayValuesCalculate.length - 1] === '*') {
                arrayValuesDisplay.pop();
                arrayValuesDisplay.pop();
                arrayValuesCalculate.pop();
                arrayValuesCalculate.pop();
                arrayValuesCalculate.push('**');
                arrayValuesDisplay.push('^');
                document.querySelector("#display").innerText = arrayValuesDisplay.join('');
            } else {
                document.querySelector("#display").innerHTML = arrayValuesDisplay.join('');
            }
        }

        const availableChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '/', '-', '(', ')', '|', '^'];

        window.addEventListener('keydown', (e) => {
            e.preventDefault();

            if (e.key == "Escape") {
                document.querySelector("#btn-AC").click();
            } else if (e.key == "Enter") {
                document.querySelector("#btn-equal").click();
            } else if (e.key == 'Backspace') {
                document.querySelector("#Del").click();
            } else if (e.key == '*') {
                document.querySelector('.btn-mult').click();
            } else if (availableChars.indexOf(e.key) > -1) {

                if (availableChars.indexOf(e.key) <= 9) {
                    arrayValuesCalculate.push(e.key * 1);
                    arrayValuesDisplay.push(e.key * 1);
                } else {
                    arrayValuesCalculate.push(e.key);
                    arrayValuesDisplay.push(e.key);
                }
            }
            updateDisplay();
        });

        // Clear display button:
        document.querySelector("#btn-AC").addEventListener('click', (e) => {
            arrayValuesCalculate = [];
            arrayValuesDisplay = [];
            inputVal = "";
            strNums = "";
            strFuns = "";
            result = 0;
            document.querySelector("#display").innerHTML = "";
            document.querySelector("#result").innerHTML = "=";
        });

        // Clear history memory:
        document.querySelector("#clearAll").addEventListener('click', (e) => {
            document.querySelector("#historial").innerText = "";
            clearHistory();
        });

        // Implement backspace button functionality:
        document.querySelector("#Del").addEventListener('click', (e) => {
            if (arrayValuesDisplay[arrayValuesDisplay.length - 1] == '</sup>') {
                arrayValuesCalculate.pop();
                arrayValuesDisplay.pop();
                modeOnlyDigitKey = 1;
            }
            if (arrayValuesDisplay[arrayValuesDisplay.length - 1] == 'x10<sup>') {
                modeOnlyDigitKey = 0;
            }

            arrayValuesCalculate.pop();
            arrayValuesDisplay.pop();
        });

        let expression = "";
        let result = 0;
        let found = "";
        document.querySelector("#btn-equal").addEventListener('click', (e) => {
            checkEXPMode(e);
            expression = arrayValuesCalculate.join('');
            found = expression.match(/\d+(?=\()|\d+(?=M)/g);
            expression = expression.replace(/\d+(?=\()|\d+(?=M)/g, `(${found})*`);
            expression = expression.replace(/\)(?=\d+)/g, ")*");
            expression = expression.replace(/\)\(/g, ")*(");

            divideAndConquer(expression);

            expression = countParenthesesAndFix(expression);

            expression = expression.replace(/\s/g, '');
            calculate(expression);
            result = roundToDecimal(result, 10);
            insertResult(result);
            saveToHistorial();
        });

        function calculate(expression) {
            try {
                result = eval(expression);
                ans = result;
                return result;
            } catch (err) {
                console.error("Calculation Error:", err);
                result = "Error";
                return result;
            }
        }
        
        let expHistoryArray = [];
        let resHistoryArray = [];
        let arrayValuesCalculateHistory = [];
        let arrayValuesDisplayHistory = [];
        let countHistory = 0;
        let historyString = "";

        function saveToHistorial() {
            let equation = arrayValuesDisplay.join('');

            let resultH = result;

            if (resultH != "Error" && resultH != "undefined" && resultH != "function sqrt() { [native code] }" && resultH != "NaN") {
                document.querySelector("#historial").insertAdjacentHTML("afterbegin", `<section class='hist ${countHistory}'> ${countHistory + 1}) ${equation} = ${resultH} </section>`);

                historyString = JSON.stringify(arrayValuesDisplay);
                arrayValuesDisplayHistory.push(historyString);
                arrayValuesCalculateHistory.push(JSON.stringify(arrayValuesCalculate));

                expHistoryArray.push(equation);
                resHistoryArray.push(resultH);
                countHistory++;
            }
        }

        function clearHistory(params) {
            countHistory = 0;
            expHistoryArray = [];
            resHistoryArray = [];
        }

        function changeSign() {
            let index = arrayValuesCalculate.length - 1;
            while ((arrayValuesCalculate[index] == '.') || (typeof ((arrayValuesCalculate[index])) == "number")) {
                index--;
            }
            if (arrayValuesCalculate[index] != '-' && arrayValuesCalculate[index] != '+') {
                arrayValuesCalculate.splice(index + 1, 0, '-');
                arrayValuesDisplay.splice(index + 1, 0, '-');
            } else if (arrayValuesCalculate[index] == '-') {
                arrayValuesCalculate[index] = '+';
                arrayValuesDisplay[index] = '+';
            } else if (arrayValuesCalculate[index] == '+') {
                arrayValuesCalculate[index] = '-';
                arrayValuesDisplay[index] = '-';
            }
            updateDisplay();
        }

        function countParenthesesAndFix(expression) {
            if (expression.match(/\(/g)) {
                let parenthesescount = 0;
                if (expression.match(/\)/g)) {
                    parenthesescount = expression.match(/\(/g).length - expression.match(/\)/g).length
                } else {
                    parenthesescount = expression.match(/\(/g).length;
                }

                while (parenthesescount > 0) {
                    expression = expression.concat(')');
                    parenthesescount = expression.match(/\(/g).length - expression.match(/\)/g).length
                }
            }
            return expression
        }

        function divideAndConquer(expression) {
            // Your implementation for divide and conquer goes here.
            // You may want to recursively break down the expression.
            // For example, handling cases like '2**3**4'.
            // Note: The provided implementation is just a placeholder.
        } 