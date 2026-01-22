import requests
from bs4 import BeautifulSoup
import yt_dlp

BASE_URL = "https://video.sibnet.ru"
ALBUMS_URL = "https://video.sibnet.ru/users/animedub/albums/"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

def get_albums(url):
    resp = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(resp.text, "html.parser")
    albums = []
    for a in soup.select("td.albomdesc a[href]"):
        href = a.get("href")
        if href and href.startswith("/alb"):
            albums.append(BASE_URL + href)
    return list(set(albums))  # убираем дубли

def get_videos(album_url):
    resp = requests.get(album_url, headers=HEADERS)
    soup = BeautifulSoup(resp.text, "html.parser")
    videos = []
    for a in soup.select("div.video a[href]"):
        href = a.get("href")
        if href and href.startswith("/video"):
            videos.append(BASE_URL + href)
    return list(set(videos))

# 1. Получаем альбомы
album_links = get_albums(ALBUMS_URL)
print(f"Нашёл {len(album_links)} альбомов")

# 2. Получаем все видео
video_links = []
for alb in album_links:
    vids = get_videos(alb)
    print(f"Альбом {alb} -> {len(vids)} видео")
    video_links.extend(vids)

print(f"Всего нашёл {len(video_links)} видео")

# 3. Скачиваем yt-dlp
ydl_opts = {
    "outtmpl": "%(uploader)s/%(playlist)s/%(title)s.%(ext)s",
    "ignoreerrors": True,
    "concurrent_fragment_downloads": 4,
}

if video_links:
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download(video_links)
