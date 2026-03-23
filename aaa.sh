#!/bin/bash
# ============================================================
# serve.sh — start a local web server and open the browser
# ============================================================
# HOW TO USE:
#   1. Put this file in your site folder (same level as index.html)
#   2. Make it executable once, by running this in Terminal:
#        chmod +x serve.sh
#   3. From then on, just run it with:
#        ./serve.sh
# ============================================================

# The port the server will listen on
PORT=8000

echo "Starting local server on http://localhost:$PORT"
echo "Press Control+C to stop."

# Open the browser after a short delay (to give the server time to start)
sleep 1 && open "http://localhost:$PORT" &

# Start the server (this stays running until you press Control+C)
python3 -m http.server $PORT
