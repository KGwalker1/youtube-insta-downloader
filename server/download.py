import yt_dlp
import sys
import json
import os

def download_video(url):
    try:
        ydl_opts = {
            "format": "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best",
            "outtmpl": "downloads/%(title)s.%(ext)s",
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        return {"message": "Downloaded successfully"}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    url = sys.argv[1]
    result = download_video(url)
    print(json.dumps(result))
