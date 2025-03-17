import React, { useState } from "react";
import faqStyles from "./FAQ.module.css";
import {ReactComponent as Arrow} from "../../assets/icons/datenavigator.svg";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "How do I create an account?",
            answer: "To create an account, click on the 'Sign Up' button and fill out the required information.",
        },
        {
            question: "How can I reset my password?",
            answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page.",
        },
        {
            question: "How to create task",
            answer: "To create a task, insert your data into the provided form in the task section." +
                " Note: both title and  description fields are required. Finally click the 'Add Task' button"
        },
    ];

    return (
        <div className={faqStyles.container}>

            <h2 className={faqStyles.header}>FAQ</h2>

            <div className={faqStyles.innerContainer}>
                {faqData.map((faq, index) => (
                    <div key={index} className={faqStyles.faqItem}>
                        <div
                            className={faqStyles.faqHeader}
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <span className={faqStyles.arrow}>
              {openIndex === index ? (
                  <Arrow className={faqStyles.arrow}/>
              ) : (
                  <Arrow className={faqStyles.arrowOpen}/>
              )}
            </span>
                        </div>
                        <div
                            className={`${faqStyles.faqContent} ${
                                openIndex === index ? faqStyles.open : ""
                            }`}
                        >
                            {faq.answer}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}