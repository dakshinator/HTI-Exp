document.addEventListener("DOMContentLoaded", () => {
const responses = {
preBreak: { logical: [], math: [] },
postBreak: { logical: [], math: [] },
};

const questions = {
pre: {
logical: [
{
question: "Statements: No doctor is an engineer. All engineers are artists. Conclusions: Some artists are doctors. All artists are engineers.",
options: [
"Only conclusion I follows",
"Only conclusion II follows",
"Either I or II follows",
"Neither I nor II follows",
"Both I and II follow",
],
answer: "Neither I nor II follows",
},
{
question: "Statements: All pens are books. Some books are papers. Conclusions: Some papers are pens. All books are pens.",
options: [
"Only conclusion I follows",
"Only conclusion II follows",
"Either I or II follows",
"Neither I nor II follows",
"Both I and II follow",
],
answer: "Neither I nor II follows",
},
{
question: "Statements: All cars are vehicles. Some vehicles are buses. Conclusions: All buses are cars. Some cars are buses.",
options: [
"Only conclusion I follows",
"Only conclusion II follows",
"Either I or II follows",
"Neither I nor II follows",
"Both I and II follow",
],
answer: "Neither I nor II follows",
},
{
question: "Statements: Some cats are dogs. All dogs are animals. Conclusions: All animals are cats. Some animals are dogs.",
options: [
"Only conclusion I follows",
"Only conclusion II follows",
"Either I or II follows",
"Neither I nor II follows",
"Both I and II follow",
],
answer: "Only conclusion II follows",
},
{
question: "Statements: All apples are fruits. All fruits are healthy. Conclusions: All apples are healthy. Some healthy things are fruits.",
options: [
"Only conclusion I follows",
"Only conclusion II follows",
"Either I or II follows",
"Neither I nor II follows",
"Both I and II follow",
],
answer: "Both I and II follow",
},
],
math: [
{
question: "A bag contains 5 red balls, 4 blue balls, and 6 green balls. Two balls are drawn at random. What is the probability that both are red?",
options: ["1/15", "2/15", "1/21", "5/21"],
answer: "2/15",
},
{
question: "A trader marks his goods at 40% above the cost price. If he gives a discount of 10%, what is his profit percentage?",
options: ["26%", "30%", "36%", "40%"],
answer: "26%",
},
{
question: "A student scored 30% of the total marks in an exam and failed by 40 marks. If the pass percentage is 40%, find the total marks.",
options: ["200", "300", "400", "500"],
answer: "400",
},
{
question: "A train 120 meters long is running at a speed of 54 km/h. How much time will it take to pass a man standing still?",
options: ["6 seconds", "7 seconds", "8 seconds", "9 seconds"],
answer: "8 seconds",
},
{
question: "A shopkeeper mixes 20 kg of rice costing $50 per kg with 30 kg of rice costing $40 per kg. At what price should he sell the mixture to make a profit of 20%?",
options: ["$48", "$52", "$54", "$56"],
answer: "$54",
},
],
},
post: {
logical: [
{
question: "Statements: Some books are papers. All papers are files. Conclusions: Some files are books. No file is a book.",
options: [
"Only conclusion I follows",
"Only conclusion II follows",
"Either I or II follows",
"Neither I nor II follows",
"Both I and II follow",
],
answer: "Only conclusion I follows",
},
{
question: "Statements: All birds are animals. Some animals are tigers. Conclusions: Some tigers are birds. All tigers are animals.",
options: [
"Only conclusion I follows",
"Only conclusion II follows",
"Either I or II follows",
"Neither I nor II follows",
"Both I and II follow",
],
answer: "Only conclusion II follows",
},
{
question: "Statements: All trees are plants. Some plants are flowers. Conclusions: Some flowers are trees. No flower is a tree.",
options: [
"Only conclusion I follows",
"Only conclusion II follows",
"Either I or II follows",
"Neither I nor II follows",
"Both I and II follow",
],
answer: "Either I or II follows",
},
{
question: "Statements: All computers are machines. Some machines are robots. Conclusions: Some computers are robots. No computer is a robot.",
options: [
"Only conclusion I follows",
"Only conclusion II follows",
"Either I or II follows",
"Neither I nor II follows",
"Both I and II follow",
],
answer: "Either I or II follows",
},
{
question: "Statements: Some men are teachers. All teachers are professionals. Conclusions: Some professionals are men. All professionals are men.",
options: [
"Only conclusion I follows",
"Only conclusion II follows",
"Either I or II follows",
"Neither I nor II follows",
"Both I and II follow",
],
answer: "Only conclusion I follows",
},
],
math: [
{
question: "A box contains 10 black pens, 6 blue pens, and 4 red pens. If three pens are drawn randomly, what is the probability that all three are blue?",
options: ["1/21", "1/15", "2/25", "2/35"],
answer: "1/21",
},
{
question: "A man buys two articles for $1000 each. He sells one article at a profit of 20% and the other at a loss of 20%. What is his overall gain or loss percentage?",
options: ["No loss, no gain", "2% gain", "2% loss", "4% loss"],
answer: "4% loss",
},
{
question: "A sum of money becomes $720 in 2 years and $900 in 5 years at simple interest. What is the principal amount?",
options: ["$600", "$500", "$450", "$400"],
answer: "$600",
},
{
question: "12 workers can complete a task in 10 days. After working for 4 days, 4 workers leave. How many more days will it take to complete the task?",
options: ["6", "7", "8", "9"],
answer: "8",
},
{
question: "By selling 20 articles for $500, a man gains 25%. What is the cost price of one article?",
options: ["$18", "$20", "$22", "$25"],
answer: "$20",
},
],
},
};
const navigateTo = (sectionId) => {
document.querySelectorAll("section").forEach((section) => (section.style.display = "none"));
document.getElementById(sectionId).style.display = "block";
};

const displaySingleQuestion = (container, questions, responseArray, index, callback) => {
container.innerHTML = "";

const questionDiv = document.createElement("div");
const q = questions[index];
if (q.question.includes("Statements:") && q.question.includes("Conclusions:")) {
const [statements, conclusions] = q.question.split("Conclusions:");
questionDiv.innerHTML = `
<p><strong>Question ${index + 1}:</strong></p>
<p><strong>Statements:</strong> ${statements.replace("Statements:", "").trim()}</p>
<p><strong>Conclusions:</strong></p>
<ul>
${conclusions
.trim()
.split(".")
.filter((line) => line.trim() !== "")
.map((line, i) => `<li>${line.trim()}.</li>`)
.join("")}
</ul>
`;
} else {
questionDiv.innerHTML = `
<p><strong>Question ${index + 1}:</strong> ${q.question}</p>
`;
}

questionDiv.innerHTML += `
${q.options
.map(
(option) =>
`<label><input type="radio" name="question${index}" value="${option}"> ${option}</label>`
)
.join("<br>")}
`;
container.appendChild(questionDiv);

const navDiv = document.createElement("div");
navDiv.style.marginTop = "15px";

if (index > 0) {
const prevButton = document.createElement("button");
prevButton.textContent = "Previous";
prevButton.addEventListener("click", () => {
displaySingleQuestion(container, questions, responseArray, index - 1, callback);
});
navDiv.appendChild(prevButton);
}

if (index < questions.length - 1) {
const nextButton = document.createElement("button");
nextButton.textContent = "Next";
nextButton.addEventListener("click", () => {
const selectedOption = container.querySelector("input[type=radio]:checked");
// Allow skipping questions
responseArray[index] = selectedOption
? {
question: q.question,
userAnswer: selectedOption.value,
correctAnswer: q.answer,
correct: selectedOption.value === q.answer,
}
: {
question: q.question,
userAnswer: null,
correctAnswer: q.answer,
correct: false, // Skipped questions are treated as incorrect
};
displaySingleQuestion(container, questions, responseArray, index + 1, callback);
});
navDiv.appendChild(nextButton);
} else {
const submitButton = document.createElement("button");
submitButton.textContent = "Submit Section";
submitButton.addEventListener("click", () => {
const selectedOption = container.querySelector("input[type=radio]:checked");
responseArray[index] = selectedOption
? {
question: q.question,
userAnswer: selectedOption.value,
correctAnswer: q.answer,
correct: selectedOption.value === q.answer,
}
: {
question: q.question,
userAnswer: null,
correctAnswer: q.answer,
correct: false,
};
callback();
});
navDiv.appendChild(submitButton);
}

container.appendChild(navDiv);
};

const calculateResults = () => {
const preLogicalCorrect = responses.preBreak.logical.filter((q) => q.correct).length;
const preMathCorrect = responses.preBreak.math.filter((q) => q.correct).length;
const postLogicalCorrect = responses.postBreak.logical.filter((q) => q.correct).length;
const postMathCorrect = responses.postBreak.math.filter((q) => q.correct).length;

return `
Pre-Break Results:
Logical: ${preLogicalCorrect}/${responses.preBreak.logical.length} Correct
Math: ${preMathCorrect}/${responses.preBreak.math.length} Correct

Post-Break Results:
Logical: ${postLogicalCorrect}/${responses.postBreak.logical.length} Correct
Math: ${postMathCorrect}/${responses.postBreak.math.length} Correct
`;
};

const downloadResults = () => {
const resultsText = calculateResults();
const blob = new Blob([resultsText], { type: "text/plain" });
const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "results.txt";
link.click();
};

navigateTo("consent-page");

document.getElementById("consent-checkbox").addEventListener("change", () => {
document.getElementById("consent-next").disabled = !document.getElementById("consent-checkbox").checked;
});

document.getElementById("consent-next").addEventListener("click", () => navigateTo("intro-page"));
document.getElementById("intro-next").addEventListener("click", () => {
navigateTo("pre-task-page");
const container = document.getElementById("pre-task-container");
displaySingleQuestion(container, questions.pre.logical, responses.preBreak.logical, 0, () => {
alert("Proceed to Math Questions.");
displaySingleQuestion(container, questions.pre.math, responses.preBreak.math, 0, () => {
alert("Pre-Break Task completed!");
navigateTo("break-page");
});
});
});

document.getElementById("proceed-to-post-task").addEventListener("click", () => {
navigateTo("post-task-page");
const container = document.getElementById("post-task-container");
displaySingleQuestion(container, questions.post.logical, responses.postBreak.logical, 0, () => {
alert("Proceed to Math Questions.");
displaySingleQuestion(container, questions.post.math, responses.postBreak.math, 0, () => {
navigateTo("thank-you-page");
});
});
});

document.getElementById("download-results").addEventListener("click", downloadResults);
});