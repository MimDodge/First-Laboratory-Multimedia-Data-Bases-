# Asynchronous Programming Patterns & Analysis in JavaScript

This repository contains the implementation and comparative analysis of three approaches for managing sequential asynchronous control flows in Node.js: **Nested Callbacks**, **Chained Promises**, and **Async/Await**. It includes a centralized module for statistical latency post-processing and edge-case evaluation with corrupted data.

---

## 📁 Repository Structure

```text
.
├── ProcessResults.js          # Post-processing module and log analysis
├── AsyncImpl.js               # Sequential implementation using Async/Await
├── AsyncImpl.limitCase.js     # Edge case (read failure) using Async/Await
├── CallbackImpl.js            # Implementation using nested Callbacks
├── CallbackImpl.limitCase.js  # Edge case (read failure) using Callbacks
├── PromiseImpl.js             # Implementation using Promise chains (.then/.catch)
└── PromiseImpl.limitCase.js   # Edge case (read failure) using Promises
