import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleChange(event) {
    const newCorrectIndex = parseInt(event.target.value);

    // Optimistic UI update: update immediately before the fetch finishes
    onUpdateQuestion({ ...question, correctIndex: newCorrectIndex });

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        onUpdateQuestion(updatedQuestion);
      });
  }

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" }).then(
      () => onDeleteQuestion(id)
    );
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleChange}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
