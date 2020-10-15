// object to keep track of values
const Calculator = {
    // displays 0
    Display_Value: '0',
    // creates variable from first operand
    First_Operand: null,
    // checks for second input
    Wait_Second_Operand: false,
    // variable for operator
    operator: null,
};

// this modifies values each time a button is clicked
function Input_Digit(digit) {
    const { Display_Value, Wait_Second_Operand } = Calculator;
    // we are checking to see if Wait_Second_Operand is true and set
    // Display_Value to the key that was clicked
    if (Wait_Second_Operand === true) {
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    } else {
        // this overwrite Display_Value of 0 or adds onto it
        Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit;
    }
}

// this section handles decimal points
function Input_Decimal(dot) {
    // this ensures that accidental clicking of the decimal point
    // doesn't cause bugs in your operation
    if (Calculator.Wait_Second_Operand === true) {
    // we are saying that id the Display_value does not contain a decimal point
    // we want to add a decimal point
    Calculator.Display_Value += dot;
    }
}

//this section handles operators
function Handle_Operator(Next_Operator) {
    const { First_Operand, Display_Value, operator } = Calculator;
    //when a operator key is pressed we convert the current number
    //displayed on the screen to a number and then store the result in
    //Calculator.FirstOperand if it doesn't already exsist
    const Value_of_Input = parseFloat(Display_Value); 
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator = Next_Operator;
        return;
    }
    if (First_Operand == null) {
        Calculator.First_Operand = Value_of_Input;
    } else if (operator) {//checks if operator already exsits
        const Value_Now = First_Operand || 0;
        let result = Perform_Calculation[operator](Value_Now, Value_of_Input);
        // this adds fixed amount of numbers after the decimal
        result = Number(result).toFixed(9)
        // this will remove extra zeros
        result = (result * 1).toString()
        Calculator.Display_Value = parseFloat(result);
        Calculator.operator = parseFloat(result);

    }
    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
}

const Perform_Calculation = {
    '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,
    '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,
    '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,
    '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,
    '=': (First_Operand, Second_Operand) => Second_Operand
};

function Calculator_Reset() {
    Calculator.Display_Value = '0';
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand = false;
    Calculator.operator = null;
}
// this function updates the screen with the contents of Display_Value
function Update_Display() {
    const display = document.querySelector('.calculator-screen');
    display.value = Calculator.Display_Value;
}

Update_Display();
// this section monitors button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (Event) => {
    const { target } = Event;
    // if the element that was click on is not a button, exit the function
    if (!target.matches('button')) {
        return;
    }
    // ensures that AC clears the numbers from the calculator
    if (target.classList.contains('operator')) {
        Handle_Operator(target.value);
        Update_Display();
        return;
    }
    
    if(target.classList.contains('decimal')) {
        Calculator_Reset();
        Update_Display();
        return;
    }

    if (target.classList.contains('all-clear')) {
        Calculator_Reset();
        Update_Display();
        return;
    }

    Input_Digit(target.value);
    Update_Display();
})