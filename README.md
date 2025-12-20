# 🧜‍♀️ DiagramGPT (DiaGrammar)

**Turn chaos into clarity. Instantly convert natural language, code, and raw data into professional diagrams using AI.**

![Project Banner](https://via.placeholder.com/1200x600?text=DiagramGPT+Dashboard)

## 💡 Inspiration
We've all been there: staring at a massive 500-line SQL file trying to visualize the database, or trying to explain a complex user flow to a non-technical stakeholder without spending hours in Figma or draw.io.

I realized that while AI is great at generating code, it's rarely used to **visualize** logic. I wanted to build a tool that bridges the gap between "text" and "understanding" by making diagram generation as easy as chatting.

## 🚀 What it does
DiagramGPT is a modern web application that takes **any input**—whether it's a vague idea, a pasted chunk of Python code, or a raw JSON object—and instantly renders a live, editable diagram.

* **Code-to-Flowchart:** Paste a function, get a logic flowchart.
* **Schema-to-ERD:** Paste SQL/Prisma schemas, get an Entity Relationship Diagram.
* **Infrastructure-as-Code:** Paste Kubernetes YAML, get a system architecture map.
* **Idea-to-Visual:** Type "Show me a roadmap for a startup," and get a Gantt chart.

## ⚙️ How I built it
This project was built in **12 hours** for the Hackathon.

* **Frontend:** Built with **Next.js** for speed and **Tailwind CSS** for a modern, "Linear-like" dark mode aesthetic.
* **The Brains:** Leveraged **Ollama / OpenAI API** with a highly tuned system prompt to function as a strict Mermaid.js syntax engine.
* **Rendering:** Integrated **Mermaid.js** directly into the React lifecycle to render SVGs on the client side.
* **UX:** Implemented `react-zoom-pan-pinch` for easy navigation of large diagrams and framer-motion for smooth UI transitions.

## 🧠 Challenges I ran into
* **Hallucinations:** The biggest challenge was getting the LLM to output *valid* Mermaid syntax 100% of the time. I solved this by refining the system prompt to strictly enforce syntax rules and creating a client-side error boundary that catches syntax errors and asks the user to retry.
* **Re-rendering Issues:** Mermaid.js can be tricky with React's state updates. I had to manually manage the render cycle using `useEffect` to ensure the diagram updated smoothly without flashing or crashing the DOM.

## 🏅 Accomplishments that I'm proud of
* Built a fully functional, production-grade UI in under 12 hours.
* Successfully handled multiple types of inputs (Code, Text, JSON) with a single universal prompt.
* The "Dark Mode" aesthetic actually looks like a tool I would use daily.

## 🔮 What's next for DiagramGPT
* **Export to Editable Formats:** Allowing users to export to Excalidraw or Figma.
* **Live Collaboration:** Using WebSockets to let teams edit diagrams together.
* **VS Code Extension:** Bringing this directly into the IDE so developers never have to leave their code editor.

---

## 🛠️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/diagram-gpt.git
    cd diagram-gpt
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    bun install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory:
    ```bash
    NEXT_PUBLIC_OLLAMA_API_KEY=your_key_here
    # or connect to local Ollama instance
    ```

4.  **Run the App**
    ```bash
    npm run dev
    # or
    bun run dev
    ```

## 📸 Screenshots

| Code to Flowchart | Database Schema |
|:---:|:---:|
| ![Code Demo](https://via.placeholder.com/400x300?text=Code+Example) | ![DB Demo](https://via.placeholder.com/400x300?text=DB+Example) |

---

*Built with ❤️ by Danish for the Hackathon.*
