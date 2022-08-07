import "./ExpensesList.css";

import ExpenseItem from "./ExpenseItem";

function ExpensesList(props) {
    if (props.expenses.length === 0) {
        return <div className="expenses-list__fallback">No expenses!</div>;
    }

    return (
        <ul className="expenses-list">
            {props.expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    date={expense.date}
                    title={expense.title}
                    amount={expense.amount}
                />
            ))}
        </ul>
    );
}

export default ExpensesList;
