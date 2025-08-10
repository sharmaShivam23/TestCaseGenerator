const axios = require('axios');
require('dotenv').config();
// exports.generateTestCaseSummaries = async (files) => {
//   // Expect files: [{ name, content }]
//   try {
//     const responses = await Promise.all(
//       files.map((file) =>
//         axios.post(
//           'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
//           {
//             // minimal example — adapt prompt as you like
//             prompt: {
//               // some APIs expect different shapes; adjust to your actual API
//               text: `Generate a concise test-case summary for this code:\n\n${file.content}`,
//             },
//           },
//           { headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` } }
//         )
//       )
//     );

//     // map with safe fallbacks (adjust parsing for actual API response)
//     return responses.map((r, i) => ({
//       file: files[i].name || `file_${i}`,
//       summary:
//         r.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         r.data?.output?.[0] ||
//         `Summary not available for ${files[i].name || i}`,
//     }));
//   } catch (err) {
//     console.error('Failed to generate test case summaries:', err.response?.data || err.message);
//     throw new Error('Failed to generate test case summaries');
//   }
// };



// exports.generateTestCode = async (summary) => {
//   try {
//     const response = await axios.post(
//       'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
//       {
//         prompt: {
//           text: `Write unit test code for the following summary:\n\n${summary}`,
//         },
//       },
//       { headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` } }
//     );

//     return (
//       response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//       response.data?.output?.[0] ||
//       'Generated test code not available'
//     );
//   } catch (err) {
//     console.error('Failed to generate test code:', err.response?.data || err.message);
//     throw new Error('Failed to generate test code');
//   }
// };

exports.generateTestCaseSummaries = async (files) => {
  try {
    const responses = await Promise.all(
      files.map((file) =>
        axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            contents: [{
              parts: [{ text: `Generate a concise test-case summary for this code:\n\n${file.content}` }]
            }]
          },
          { headers: { "Content-Type": "application/json" } }
        )
      )
    );

    return responses.map((r, i) => ({
      file: files[i].name || `file_${i}`,
      summary: r.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
               `Summary not available for ${files[i].name || i}`,
    }));
  } catch (err) {
    console.error('Failed to generate test case summaries:', err.response?.data || err.message);
    throw new Error('Failed to generate test case summaries');
  }
};

exports.generateTestCode = async (summary) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{ text: `Write unit test code for this summary:\n\n${summary}` }]
        }]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Generated test code not available';
  } catch (err) {
    console.error('Failed to generate test code:', err.response?.data || err.message);
    throw new Error('Failed to generate test code');
  }
};
