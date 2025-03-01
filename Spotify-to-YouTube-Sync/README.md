Spotify to YouTube Sync
This Python script allows you to download your liked songs from Spotify as MP3 files using YouTube videos. It utilizes the Spotify API to retrieve your liked songs, searches for the corresponding videos on YouTube using the YouTube Data API, and downloads the videos as MP3 files using the yt_dlp library.
Prerequisites
Before running this script, you'll need to have the following installed:

Python 3.x
FFmpeg (https://ffmpeg.org/download.html)

Additionally, you'll need to install the required Python libraries by running the following command:
Copy codepip install spotipy google-api-python-client yt-dlp
Setup

Clone this repository to your local machine:

Copy codegit clone https://github.com/your-username/spotify-to-youtube-downloader.git

Navigate to the project directory:

Copy codecd spotify-to-youtube-downloader

Open the main.py file and update the following variables with your own credentials:

pythonCopy codeSPOTIFY_CLIENT_ID = 'your_spotify_client_id'
SPOTIFY_CLIENT_SECRET = 'your_spotify_client_secret'
YOUTUBE_API_KEY = 'your_youtube_api_key'
You can obtain the Spotify client ID and client secret by creating a new application on the Spotify Developer Dashboard. The YouTube API key can be obtained from the Google Cloud Console.

Update the external_downloader path in the download_video() function to match the location of your ffmpeg.exe file.

pythonCopy code'external_downloader': r'path/to/your/ffmpeg.exe',
Usage
To run the script, execute the following command:
Copy codepython main.py
The script will authenticate with the Spotify API, retrieve your liked songs, search for the corresponding videos on YouTube, and download the videos as MP3 files in the same directory as the script.
