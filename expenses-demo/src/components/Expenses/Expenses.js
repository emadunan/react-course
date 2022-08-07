import { useState } from "react";

import "./Expenses.css";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
function Expenses(props) {
    const [selectedYear, setSelectedYear] = useState("2019");

    const filterExpensesHandler = (year) => {
        setSelectedYear(year);
    };

    const expenses = props.expenses.filter(
        (ex) => ex.date.getFullYear().toString() === selectedYear
    );

    return (
        <Card className="expenses">
            <ExpensesFilter
                onFilterExpenses={filterExpensesHandler}
                selectedYear={selectedYear}
            />
            <ExpensesChart expenses={expenses} />
            <ExpensesList expenses={expenses} />
        </Card>
    );
}

export default Expenses;
