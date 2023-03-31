import { SetStateAction, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
    const [prompt, setPrompt] = useState('');
    const [files, setFiles] = useState([]);
    const [apiKey, setApiKey] = useState('');

    const handlePromptChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPrompt(e.target.value);
    };

    const handleFileChange = (e: { target: { files: SetStateAction<never[]>; }; }) => {
        setFiles(e.target.files);
    };

    const handleApiKeyChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setApiKey(e.target.value);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!prompt || files.length === 0 || !apiKey) {
            alert('Please enter a prompt, API key, and select files to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('prompt', prompt);
        formData.append('api_key', apiKey);
        Array.from(files).forEach((file) => formData.append('files', file));

        try {
            const response = await fetch('/api/analyze-docx', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Files processed successfully!');
            } else {
                alert('An error occurred. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-6">DOCX Analyzer</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="prompt" className="block text-sm font-medium">
                            Prompt
                        </label>
                        <input
                            type="text"
                            id="prompt"
                            value={prompt}
                            onChange={handlePromptChange}
                            className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="files" className="block text-sm font-medium">
                            Upload DOCX Files
                        </label>
                        <input
                            type="file"
                            id="files"
                            multiple
                            accept=".docx"
                            onChange={handleFileChange}
                            className="mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="api_key" className="block text-sm font-medium">
                            OpenAI API Key
                        </label>
                        <input
                            type="password"
                            id="api_key"
                            value={apiKey}
                            onChange={handleApiKeyChange}
                            className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Analyze and Append Review
                    </button>
                </form>
            </div>
        </div>
    )
}


export default App
