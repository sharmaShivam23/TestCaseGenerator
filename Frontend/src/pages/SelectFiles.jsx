import React, { useEffect, useState, useRef } from "react";
import API from "../api";
import Tumnail from "../assets/images/Tumnail.svg";
import toast from "react-hot-toast";
import Loader from "../components/Loading";
import { FaExpand } from "react-icons/fa6";
import { AiOutlineShrink } from "react-icons/ai";
import { FaCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SelectFiles() {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [testCode, setTestCode] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const repo = localStorage.getItem("selectedRepo");
  const [loading, setLoading] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingTestCase, setLoadingTestCase] = useState(false);
  const [expand, setExpand] = useState(false);
  const [loadingPush, setLoadingPush] = useState(false); //push request loding
  const navigate = useNavigate();

  const paragraphRef = useRef(null);
  const paragraphRef2 = useRef(null);

  const handleCopy = (ref) => {
    if (ref.current) {
      const text = ref.current.textContent;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.success("Copied to clipboard!");
        })
        .catch(() => {
          toast.error("Failed to copy!");
        });
    }
  };

  const fetchFiles = async (path = "") => {
    setLoading(true);
    try {
      const response = await API.get(`/repos/files?repo=${repo}&path=${path}`);
      setFiles(response?.data || []);
      if (response?.status === 200) {
        toast.success("Getting All Files Successfully");
      }
    } catch (err) {
      toast.error("Failed to get Files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles(currentPath);
  }, [currentPath]);

  const toggleFile = (file) => {
    setSelectedFiles((prev) =>
      prev.includes(file) ? prev.filter((f) => f !== file) : [...prev, file]
    );
  };

  const generateTestCases = async () => {
    setLoadingSummary(true);
    try {
      const response = await API.post("/generate/summary", {
        repo,
        files: selectedFiles,
      });
      if (response?.status === 200) {
        toast.success("Getting All Test Summaries Successfully");
      }
      setSummaries(response?.data?.summaries || []);
    } catch (err) {
      console.error("Failed to generate summaries:", err);
      toast.error("Failed to generate test summary");
    } finally {
      setLoadingSummary(false);
    }
  };

  const generateTest = async (summaryText) => {
    setLoadingTestCase(true);
    try {
      const res = await API.post("/generate/test", {
        summary: summaryText,
      });
      if (res?.status === 200) {
        toast.success("Getting All Test Cases Successfully");
      }
      setTestCode(res?.data?.testCode || "No test code generated");
    } catch (err) {
      console.error("Failed to generate test code:", err);
      toast.error("Failed to generate test code");
    } finally {
      setLoadingTestCase(false);
    }
  };

  const goBack = () => {
    if (!currentPath) return;
    const parts = currentPath.split("/").filter(Boolean);
    parts.pop();
    setCurrentPath(parts.join("/"));
  };

  //pull request flow
  const pushCodeToGithub = async () => {
    if (!testCode) {
      toast.error("No test code available to push");
      return;
    }
    if (!selectedFiles.length) {
    toast.error("No file selected for PR");
    return;
  }

    setLoadingPush(true);
    try {
      const branchName = `test-case-${Date.now()}`;
      await API.post("/create-pr", {
        repo,
        branch: branchName,
        filePath: selectedFiles[0],
        content: testCode,
        prTitle: "Add generated test cases",
      });

      toast.success(`Pull request created for branch ${branchName}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to push code to GitHub");
    } finally {
      setLoadingPush(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Tumnail})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen w-full flex flex-col items-center p-6"
    >
      <h2
        className="md:text-4xl max-[500px]:text-lg max-[400px]:text-lg mt-14 font-bold mb-8 tracking-wide text-center"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          background: "linear-gradient(90deg, #a855f7, #6366f1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow:
            "0 0 15px rgba(168,85,247,0.7), 0 0 30px rgba(99,102,241,0.5)",
        }}
      >
        Select Files from <br /> {repo}
      </h2>

      <button
        onClick={() => navigate("/select-repo")}
        className="px-6 py-3 absolute top-4 sm:top-8 left-5 cursor-pointer rounded-lg font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.8)] transition-all duration-300"
      >
        🡸 Back
      </button>

      <div className="flex md:flex-row flex-col w-full max-w-7xl gap-6">
        {/* Left: File List */}
        <div
          data-lenis-prevent
          className="md:w-1/3 w-full max-h-[70vh] overflow-y-auto space-y-3 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-violet-500/30 custom-scrollbar"
        >
          {loading ? (
            <Loader />
          ) : files.length === 0 ? (
            <div className="text-center text-white/80 mt-10 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-violet-500/40">
              <p className="text-lg font-semibold">⚠ No files found</p>
              <p className="text-sm text-white/60 mt-1">
                Please check the repository or try again.
              </p>
            </div>
          ) : (
            <>
              {currentPath && (
                <button
                  onClick={goBack}
                  className="px-4 py-2 text-sm rounded bg-purple-600 text-white w-full mb-2"
                >
                  ⬅ Back
                </button>
              )}
              {files.map((file) => (
                <label
                  key={file.path}
                  className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-violet-500/30 hover:border-violet-400 transition-all duration-300"
                >
                  {file.type === "dir" ? (
                    <span
                      className="text-white cursor-pointer"
                      onClick={() => setCurrentPath(file.path)}
                    >
                      📁 {file.name}
                    </span>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        onChange={() => toggleFile(file.path)}
                        checked={selectedFiles.includes(file.path)}
                        className="accent-violet-500 w-5 h-5"
                      />
                      <span className="text-white">{file.name}</span>
                    </>
                  )}
                </label>
              ))}
            </>
          )}
        </div>

        {/* Right: Summaries */}
        <div
          data-lenis-prevent
          className="flex-1 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-violet-500/30 space-y-4 overflow-y-auto max-h-[70vh] custom-scrollbar"
        >
          {loadingSummary ? (
            <Loader />
          ) : (
            <button
              onClick={generateTestCases}
              className="px-6 py-3 cursor-pointer rounded-lg font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.8)] transition-all duration-300"
            >
              🚀 Generate Summaries
            </button>
          )}

          {summaries.length === 0 && (
            <div className="text-center text-white/80 mt-10 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-violet-500/40">
              <p className="text-lg font-semibold">⚠ No Summary found</p>
              <p className="text-sm text-white/60 mt-1">
                Please select the file and click on generate summary.
              </p>
            </div>
          )}

          {summaries.length > 0 && (
            <>
              <div className="h text-white font-bold flex items-center justify-between">
                <h3 className="text-xl font-bold text-white mt-4">
                  Generated Summaries:
                </h3>
                <h3
                  onClick={() => handleCopy(paragraphRef)}
                  className="flex gap-2 backdrop-blur-2xl py-2 px-4 cursor-pointer rounded-lg"
                >
                  Copy
                  <FaCopy className="text-xl" />
                </h3>
              </div>
              {summaries.map((item, i) => (
                <div
                  ref={paragraphRef}
                  key={i}
                  className="bg-black/30 p-4 rounded-lg border border-violet-500/30"
                >
                  <h4 className="font-semibold text-violet-300">{item.file}</h4>
                  <p className="text-white/80 mt-1">{item.summary}</p>
                  {loadingTestCase ? (
                    <Loader />
                  ) : (
                    <button
                      onClick={() => generateTest(item.summary)}
                      className="mt-3 px-4 cursor-pointer py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-500 text-white text-sm hover:shadow-[0_0_12px_rgba(139,92,246,0.8)] transition-all duration-300"
                    >
                      🧪 Generate Test Code
                    </button>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {testCode.length === 0 && (
        <div className="text-center text-white/80 mt-10 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-violet-500/40">
          <p className="text-lg font-semibold">⚠ No Test Cases found</p>
          <p className="text-sm text-white/60 mt-1">
            Please click on generate test Code button.
          </p>
        </div>
      )}

      {/* //pull request button */}
      {testCode && (
        <button
          onClick={pushCodeToGithub}
          disabled={loadingPush}
          className="mt-3 px-4 py-2 cursor-pointer rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm hover:shadow-[0_0_12px_rgba(16,185,129,0.8)] transition-all duration-300"
        >
          {loadingPush ? "Pushing to GitHub..." : "Push Code to GitHub"}
        </button>
      )}

      {testCode && (
        <div
          data-lenis-prevent
          className={`mt-6 w-full ${
            expand ? "h-auto" : "h-[50vh] overflow-y-scroll"
          } custom-scrollbar max-w-7xl bg-black/40 backdrop-blur-md p-4 rounded-xl border border-violet-500/30`}
        >
          <div className="h flex w-full justify-between">
            <h3 className="text-xl font-bold text-violet-300 mb-2">
              Generated Test Code:
            </h3>
            <div className="k flex gap-4 text-white">
              <h3
                onClick={() => handleCopy(paragraphRef2)}
                className="flex mb-2 gap-2 backdrop-blur-2xl py-2 px-4 cursor-pointer rounded-lg"
              >
                Copy
                <FaCopy className="text-xl" />
              </h3>
              <h3
                onClick={() => setExpand((prev) => !prev)}
                className="cursor-pointer text-2xl font-bold text-violet-300 mt-1 mb-2"
              >
                {!expand ? <FaExpand /> : <AiOutlineShrink />}
              </h3>
            </div>
          </div>
          <pre
            ref={paragraphRef2}
            className="bg-black/50 text-white p-3 rounded-lg overflow-x-auto whitespace-pre-wrap"
          >
            {testCode}
          </pre>
        </div>
      )}

      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(139, 92, 246, 0.6);
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(139, 92, 246, 0.8);
          }
        `}
      </style>
    </div>
  );
}
