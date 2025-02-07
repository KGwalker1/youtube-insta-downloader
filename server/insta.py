import instaloader
import sys
import json

def download_instagram_video(url):
    try:
        loader = instaloader.Instaloader()
        post = instaloader.Post.from_shortcode(loader.context, url.split("/")[-2])
        loader.download_post(post, target="Downloads")
        return {"message": "Downloaded successfully"}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    url = sys.argv[1]
    print(json.dumps(download_instagram_video(url)))
