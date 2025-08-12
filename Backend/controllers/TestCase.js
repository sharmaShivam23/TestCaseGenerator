const axios = require('axios');
require('dotenv').config();
const { Octokit } = require('@octokit/rest');
const { decrypt } = require('../utils/crypto');
const { generateTestCaseSummaries, generateTestCode } = require('../utils/generateTestCases');

// helper headers
const APP_NAME = process.env.APP_NAME || 'MyApp';
function ghHeaders(token) {
  return {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': APP_NAME,
  };
}

exports.listRepos = async (req, res) => {
  try {
    // const token = req.body
    const token = decrypt(req.user.githubAccessToken);
    const repos = [];
    let page = 1;
    while (true) {
      const r = await axios.get('https://api.github.com/user/repos', {
        headers: ghHeaders(token),
        params: { per_page: 100, page },
      });
      if (!Array.isArray(r.data) || r.data.length === 0) break;
      repos.push(...r.data);
      if (r.data.length < 100) break;
      page++;
    }
    const simplified = repos.map((r) => ({
      id: r.id,
      name: r.name,
      full_name: r.full_name,
      private: r.private,
      description: r.description,
      default_branch: r.default_branch,
      owner: r.owner && r.owner.login,
    }));
    res.json(simplified);
  } catch (err) {
    console.error('Failed to list repos:', err.response?.data || err.message);
    res.status(500).json({ message: 'Failed to list repositories' });
  }
};

exports.getRepoFiles = async (req, res) => {
  const { repo, path = '' } = req.query;
  if (!repo || !repo.includes('/')) return res.status(400).json({ message: 'Invalid repo format. Use owner/repo' });

  const [owner, repoName] = repo.split('/');
  try {
    const token = decrypt(req.user.githubAccessToken);
    const url = `https://api.github.com/repos/${owner}/${repoName}/contents/${path}`;
    const r = await axios.get(url, { headers: ghHeaders(token) });
    res.json(r.data);
  } catch (err) {
    console.error('Failed to fetch repo files:', err.response?.data || err.message);
    const status = err.response?.status || 500;
    res.status(status).json({ message: 'Failed to fetch repo contents' });
  }
};


async function fetchFileContent(repo, path) {
  const res = await axios.get(`https://api.github.com/repos/${repo}/contents/${path}`, {
    headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
  });

  return {
    name: res.data.name,
    content: Buffer.from(res.data.content, "base64").toString("utf-8")
  };
}

exports.generateSummary = async (req, res) => {
  const { repo, files } = req.body;

  if (!files || !Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ message: "Files array is required" });
  }

  try {
    // Fetch real file contents from GitHub
    const fileObjs = await Promise.all(files.map(path => fetchFileContent(repo, path)));

    // Now pass proper objects to Gemini
    const summaries = await generateTestCaseSummaries(fileObjs);
    res.json({ summaries });
  } catch (err) {
    console.error("Failed to generate summaries:", err.message);
    res.status(500).json({ message: "Failed to generate summaries" });
  }
};



exports.generateTestCase = async (req, res) => {
  const { summary } = req.body;
  if (!summary) return res.status(400).json({ message: 'Summary is required' });
  try {
    const testCode = await generateTestCode(summary);
    res.json({ testCode });
  } catch (err) {
    console.error('Failed to generate test code:', err.message);
    res.status(500).json({ message: 'Failed to generate test code' });
  }
};

// exports.createPR = async (req, res) => {
//   const { repo, baseBranch = 'main', filePath, content, prTitle } = req.body;
//   if (!repo || !repo.includes('/')) return res.status(400).json({ message: 'Invalid repo' });
//   if (!filePath || !content) return res.status(400).json({ message: 'filePath and content required' });

//   const [owner, repoName] = repo.split('/');
//   try {
//     const token = decrypt(req.user.githubAccessToken);
//     const octokit = new Octokit({ auth: token, userAgent: APP_NAME });

//     // get base branch ref SHA
//     const baseRef = `heads/${baseBranch}`;
//     const { data: refData } = await octokit.git.getRef({ owner, repo: repoName, ref: baseRef });
//     const baseSha = refData.object.sha;

//     // create new branch
//     const newBranch = `test-cases-${Date.now()}`;
//     await octokit.git.createRef({
//       owner,
//       repo: repoName,
//       ref: `refs/heads/${newBranch}`,
//       sha: baseSha,
//     });

//     // check if file exists on base branch
//     let exists = false;
//     let existingSha = null;
//     try {
//       const getRes = await octokit.repos.getContent({ owner, repo: repoName, path: filePath, ref: baseBranch });
//       if (getRes && getRes.data && getRes.data.sha) {
//         exists = true;
//         existingSha = getRes.data.sha;
//       }
//     } catch (e) {
//       // file doesn't exist => create
//       exists = false;
//     }

//     if (exists) {
//       // update
//       await octokit.repos.createOrUpdateFileContents({
//         owner,
//         repo: repoName,
//         path: filePath,
//         message: prTitle || 'Update generated test cases',
//         content: Buffer.from(content).toString('base64'),
//         branch: newBranch,
//         sha: existingSha,
//       });
//     } else {
//       // create
//       await octokit.repos.createOrUpdateFileContents({
//         owner,
//         repo: repoName,
//         path: filePath,
//         message: prTitle || 'Add generated test cases',
//         content: Buffer.from(content).toString('base64'),
//         branch: newBranch,
//       });
//     }

//     // create PR
//     const { data: pr } = await octokit.pulls.create({
//       owner,
//       repo: repoName,
//       title: prTitle || 'Add generated test cases',
//       head: newBranch,
//       base: baseBranch,
//       body: 'Auto-generated test cases by TestGen'
//     });

//     res.json({ prUrl: pr.html_url });
//   } catch (err) {
//     console.error('Failed to create PR:', err.response?.data || err.message);
//     const status = err.status || 500;
//     if (err.response?.status === 403 && String(err.response?.data)?.includes('rate limit')) {
//       return res.status(429).json({ message: 'GitHub API rate limit exceeded' });
//     }
//     res.status(status).json({ message: 'Failed to create PR' });
//   }
// };

exports.createPR = async (req, res) => {
  try {
    const { repo, filePath, content, prTitle } = req.body;

    // Validate inputs
    if (!repo || !/^[^/]+\/[^/]+$/.test(repo)) {
      return res.status(400).json({ message: "Invalid repo format. Use 'owner/repo'." });
    }
    if (!filePath || typeof filePath !== "string" || filePath.trim() === "") {
      return res.status(400).json({ message: "filePath is required and must be a string" });
    }
    if (!content || typeof content !== "string") {
      return res.status(400).json({ message: "content is required and must be a string" });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return res.status(500).json({ message: "GitHub token not configured" });
    }

    const [owner, repoName] = repo.split("/");

    // Step 0: Get default branch
    const repoInfo = await axios.get(
      `https://api.github.com/repos/${owner}/${repoName}`,
      { headers: { Authorization: `Bearer ${githubToken}` } }
    );
    const baseBranch = "main"
    // const baseBranch = repoInfo.data.default_branch;

    // Step 1: Get latest commit SHA from base branch
    const { data: baseRef } = await axios.get(
      `https://api.github.com/repos/${owner}/${repoName}/git/ref/heads/${baseBranch}`,
      { headers: { Authorization: `Bearer ${githubToken}` } }
    );
    const latestCommitSha = baseRef.object.sha;

    // Step 2: Create a new branch
    const branchName = `test-case-${Date.now()}`;
    await axios.post(
      `https://api.github.com/repos/${owner}/${repoName}/git/refs`,
      {
        ref: `refs/heads/${branchName}`,
        sha: latestCommitSha
      },
      { headers: { Authorization: `Bearer ${githubToken}` } }
    );

    // Step 3: Check if file exists in base branch
    let blobSha = null;
    try {
      const fileData = await axios.get(
        `https://api.github.com/repos/${owner}/${repoName}/contents/${filePath}?ref=${baseBranch}`,
        { headers: { Authorization: `Bearer ${githubToken}` } }
      );
      blobSha = fileData.data.sha; // Existing file SHA for updates
    } catch {
      console.warn(`File ${filePath} not found in ${baseBranch}, creating new one.`);
    }

    // Step 4: Create or update file in new branch
    await axios.put(
      `https://api.github.com/repos/${owner}/${repoName}/contents/${filePath}`,
      {
        message: prTitle || "Add generated test case",
        content: Buffer.from(content).toString("base64"),
        branch: branchName,
        ...(blobSha ? { sha: blobSha } : {}) // only include sha if updating
      },
      { headers: { Authorization: `Bearer ${githubToken}` } }
    );

    // Step 5: Create a pull request
    const prData = await axios.post(
      `https://api.github.com/repos/${owner}/${repoName}/pulls`,
      {
        title: prTitle || "Generated test cases",
        head: branchName,
        base: baseBranch,
        body: "This PR contains auto-generated test cases."
      },
      { headers: { Authorization: `Bearer ${githubToken}` } }
    );

    return res.json({
      message: "PR created successfully",
      url: prData.data.html_url
    });

  } catch (error) {
    console.error("GitHub API Error:", error.response?.data || error.message);
    return res.status(500).json({
      message: "Failed to create PR",
      error: error.response?.data || error.message
    });
  }
};