import requests
import os

def download_image(url, path):
    """Download an image from a URL and save it to a specified path."""
    response = requests.get(url)
    if response.status_code == 200:
        with open(path, 'wb') as file:
            file.write(response.content)
    else:
        print(f"Failed to download image from {url}")

def main():
    # Create directories if they don't exist
    originals_dir = 'public/images/originals'
    thumbnails_dir = 'public/images/thumbnails'
    if not os.path.exists(originals_dir):
        os.makedirs(originals_dir)
    if not os.path.exists(thumbnails_dir):
        os.makedirs(thumbnails_dir)

    # Generate and download each image and its thumbnail
    for i in range(1054, 1056):
        original_url = f'https://picsum.photos/id/{i}/1000/600/'
        thumbnail_url = f'https://picsum.photos/id/{i}/250/150/'
        
        original_path = os.path.join(originals_dir, f'image_{i}.jpg')
        thumbnail_path = os.path.join(thumbnails_dir, f'thumbnail_{i}.jpg')
        
        print(f"Downloading original image {i}")
        download_image(original_url, original_path)
        
        print(f"Downloading thumbnail {i}")
        download_image(thumbnail_url, thumbnail_path)

if __name__ == "__main__":
    main()