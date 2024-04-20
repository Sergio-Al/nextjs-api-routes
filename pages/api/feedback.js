import fs from "fs";
import path from "path";

// Any code I wrote here will never end up in any client side bundle
// It will never be exposed!
function handler(req, res) {
  if (req.method === "POST") {
    console.log("Hi im a post method request!");
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text: feedbackText,
    };

    // store that in a db or in a file...
    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", data: newFeedback });
  } else {
    res.status(200).json({ message: "This works!" });
  }
}

export default handler;