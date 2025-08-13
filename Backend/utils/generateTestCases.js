const axios = require("axios");
require("dotenv").config();

exports.generateTestCaseSummaries = async (files) => {
  try {
    const responses = await Promise.all(
      files.map((file) =>
        axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            // contents: [{
            //   parts: [{ text: `Generate a concise test-case summary for this code:\n\n${file.content}` }]
            // }]
           contents: [
  {
    parts: [
      {
        text: `
You are a professional QA engineer.
Analyze the following code and produce a clear, bullet-point test-case summary.

Formatting rules:
- Use Markdown.
- Each section heading (### or ####) must be on its own line ans use green color for it.
- Each bullet point must start with "- " on a new line (never inline after a heading) use blue color for it.
- No extra text before or after the summary.

Use differnet colors to highlights the only important points like chatgpt

Format example:

### Test Case Summary

#### Positive Cases
- First positive case
- Second positive case

#### Edge Cases
- First edge case
- Second edge case

#### Negative Cases
- First negative case
- Second negative case

Code:
${file.content}
        `
      }
    ]
  }
]

          },
          { headers: { "Content-Type": "application/json" } }
        )
      )
    );

    return responses.map((r, i) => ({
      file: files[i].name || `file_${i}`,
      summary:
        r.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        `Summary not available for ${files[i].name || i}`,
    }));
  } catch (err) {
    console.error(
      "Failed to generate test case summaries:",
      err.response?.data || err.message
    );
    throw new Error("Failed to generate test case summaries");
  }
};

exports.generateTestCode = async (summary) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        // contents: [
        //   {
        //     parts: [
        //       { text: `Write unit test code for this summary:\n\n${summary}` },
        //     ],
        //   },
        // ],
        contents: [
  {
    parts: [
      {
        text: `
You are a senior software engineer.
Using the following **test case summary**, generate complete unit test code.

Requirements:
- Detect the programming language from the code context in the summary with yellow color.
- Use the most common testing framework for that language (e.g., Jest for JavaScript, Pytest for Python, JUnit for Java, unittest for C#, etc.).
- Include necessary imports or setup for the chosen framework.
- Follow the Arrange–Act–Assert (AAA) pattern.
- Use descriptive test suite and test case names based on the summary.
- Output ONLY one fenced code block with the correct language tag (e.g., \`\`\`python, \`\`\`java).
- Do NOT add any explanations, comments, or text outside the code block.
- Use different colors to highlights only important points like chatgpt

Test Case Summary:
${summary}
        `
      }
    ]
  }
]

      },
      { headers: { "Content-Type": "application/json" } }
    );

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Generated test code not available"
    );
  } catch (err) {
    console.error(
      "Failed to generate test code:",
      err.response?.data || err.message
    );
    throw new Error("Failed to generate test code");
  }
};
