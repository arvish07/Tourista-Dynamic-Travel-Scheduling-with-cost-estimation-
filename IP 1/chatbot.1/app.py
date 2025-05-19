from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from your HTML

# Your Gemini API key
API_KEY = "your api key"
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent"

@app.route('/query', methods=['POST'])
def query_gemini():
    try:
        # Get user input from the front end
        data = request.json
        user_input = data.get('query')

        # Make request to Gemini API
        headers = {
            "Content-Type": "application/json",
        }
        payload = {
            "contents": [{"parts": [{"text": user_input}]}]
        }
        response = requests.post(
            f"{GEMINI_API_URL}?key={API_KEY}",
            headers=headers,
            json=payload
        )

        # Check for successful response
        if response.status_code == 200:
            result = response.json()
            # Extract the generated text (adjust based on actual API response structure)
            generated_text = result.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', 'No response')
            return jsonify({"response": generated_text})
        else:
            return jsonify({"error": f"Gemini API error: {response.status_code} - {response.text}"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)