# Deep Seek Chat Extension

Deep Seek Chat is a VS Code extension that allows you to interact with a chatbot directly from your editor. The chatbot uses the `ollama` library to provide responses.

## Features

- Chat with a helpful assistant directly from VS Code.
- Real-time streaming responses.

## Requirements

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Ollama](https://www.npmjs.com/package/ollama) library

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Arin101230523/Philosopher
    cd deep-seek-chat
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Install Ollama:**

    ```sh
    npm install ollama
    ```

## Usage

1. **Open the project in VS Code:**

    ```sh
    code .
    ```

2. **Compile the TypeScript code:**

    ```sh
    npm run compile
    ```

3. **Run the extension:**

    - Press `F5` to open a new VS Code window with the extension loaded.

4. **Start Deep Seek Chat:**

    - Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
    - Type `Deep Seek Chat` and select `Start Deep Seek Chat`.

5. **Interact with the chatbot:**

    - Type your question in the text area and click the `Ask` button.
    - The response will be displayed in the `response` section.

## Configuration

The chatbot uses the `deepseek-r1:1.5b` model by default. You can change the system prompt or model by modifying the `extension.ts` file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.