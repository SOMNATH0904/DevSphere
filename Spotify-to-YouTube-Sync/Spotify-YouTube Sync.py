import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os
import googleapiclient.discovery
import yt_dlp

# Spotify Credentials
SPOTIFY_CLIENT_ID = '0397998db84e4295a2e205be21da5009'
SPOTIFY_CLIENT_SECRET = '50bb61d99be543019b25fc5e93b09719'
SPOTIFY_REDIRECT_URI = 'http://localhost:8888/callback'

# YouTube Credentials
YOUTUBE_API_KEY = 'AIzaSyAbTwjXGWoz4EhlOM5WbCTqGZgvz-RPBeI'

# Authenticate with Spotify API
def authenticate_spotify():
    # Authentication with Spotify
    auth_manager = SpotifyOAuth(client_id=SPOTIFY_CLIENT_ID,
                                client_secret=SPOTIFY_CLIENT_SECRET,
                                redirect_uri=SPOTIFY_REDIRECT_URI,
                                scope='user-library-read')
    return spotipy.Spotify(auth_manager=auth_manager)

# Search YouTube for a song
def search_youtube(song_name, youtube):
    request = youtube.search().list(
        q=song_name,
        part="id",
        type="video",
        maxResults=1
    )
    response = request.execute()
    if response['items']:
        return response['items'][0]['id']['videoId']
    return None

# Download YouTube video
def download_video(video_id, output_path):
    ydl_opts = {
        'outtmpl': output_path,
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'verbose': True,
        'external_downloader': r'C:\ffmpeg\bin\ffmpeg.exe',  # Update this path to the location of your ffmpeg.exe
        'external_downloader_args': ['-i', '%(url)s', '-ab', '192k', '-f', 'mp3', '%(outtmpl)s'],
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download(['https://www.youtube.com/watch?v=' + video_id])

def main():
    # Authenticate with Spotify
    spotify = authenticate_spotify()

    # Get liked songs from Spotify
    liked_songs = spotify.current_user_saved_tracks(limit=10)  # Adjust limit as needed

    # Initialize YouTube API client
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=YOUTUBE_API_KEY)

    # Search and download each song from YouTube
    for song in liked_songs['items']:
        track_name = song['track']['name']
        artist_name = song['track']['artists'][0]['name']
        query = f"{track_name} {artist_name} audio"
        
        # Search YouTube for the song
        video_id = search_youtube(query, youtube)
        if video_id:
            print(f"Downloading '{track_name}'...")
            download_video(video_id, f"{track_name}.mp3")
        else:
            print(f"No matching video found for '{track_name}'")

if __name__ == "__main__":
    main()