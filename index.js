const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/api/report", (req, res) => {
  console.log(req.body);
  const answers = req.body.candidateAnswers;
  var json = JSON.stringify(answers);

  fs.mkdir("./reportCard", { recursive: true }, (err) => {
    if (err) throw err;
    fs.appendFile(
      "./reportCard/candidateScore.json",
      `"Candidate name": "${req.body.candidateName}"
       "Candidate email": "${req.body.candidateEmail}"
       "Answers given for quiz": "${json}"`,
      (err) => {
        if (err) throw err;
      }
    );
  });
  res.send("1");
});

//PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listining on port: ${port}`));
