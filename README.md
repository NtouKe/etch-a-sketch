# etch-a-sketch

Live Demo
[[Etch-A-Sketch](https://ntouke.github.io/etch-a-sketch/)]

Project: Etch-A-Sketch
A browser-based version of the classic Etch-A-Sketch toy. This project focuses on DOM manipulation, event listeners, and using CSS Flexbox to create dynamic layouts.

Performance Optimization
[codesignal](https://codesignal.com/learn/courses/mastering-the-dom-api/lessons/high-speed-web-interfaces-efficient-dom-manipulation-and-javascript-optimization-techniques)

To keep the application smooth at 10,000 cells (100x100), I implemented:

Event Delegation: Instead of attaching 10,000 listeners, a single listener on the #container manages all drawing logic by checking event.target.

Document Fragments: When regenerating the grid, cells are first appended to a DocumentFragment in memory. This results in a single DOM reflow, significantly increasing speed.
