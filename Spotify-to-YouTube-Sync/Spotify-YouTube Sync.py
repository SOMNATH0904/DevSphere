import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import googleapiclient.discovery
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Securely load API keys
SPOTIFY_CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')
SPOTIFY_REDIRECT_URI = os.getenv('SPOTIFY_REDIRECT_URI', 'http://localhost:8888/callback')
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')

# Authenticate with Spotify API
def authenticate_spotify():
    auth_manager = SpotifyOAuth(
        client_id=SPOTIFY_CLIENT_ID,
        client_secret=SPOTIFY_CLIENT_SECRET,
        redirect_uri=SPOTIFY_REDIRECT_URI,
        scope='user-library-read'
    )
    return spotipy.Spotify(auth_manager=auth_manager)

# Search YouTube for a song and return its video URL
def search_youtube(song_name, youtube):
    request = youtube.search().list(
        q=song_name,
        part="id",
        type="video",
        maxResults=1
    )
    response = request.execute()
    
    if response.get('items'):
        video_id = response['items'][0]['id']['videoId']
        return f"https://www.youtube.com/watch?v={video_id}"
    return None

def main():
    # Authenticate with Spotify
    spotify = authenticate_spotify()

    # Get liked songs from Spotify (limit to 10 for demonstration)
    liked_songs = spotify.current_user_saved_tracks(limit=10)

    # Initialize YouTube API client
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=YOUTUBE_API_KEY)

    # Search and display YouTube links for each song
    for song in liked_songs['items']:
        track_name = song['track']['name']
        artist_name = song['track']['artists'][0]['name']
        query = f"{track_name} {artist_name} audio"

        # Search YouTube for the song
        video_url = search_youtube(query, youtube)
        if video_url:
            print(f"{track_name} by {artist_name}: {video_url}")
        else:
            print(f"No YouTube video found for '{track_name}'")

if __name__ == "__main__":
    main()
