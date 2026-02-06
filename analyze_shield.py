from PIL import Image
import collections

def analyze(path):
    print(f"Analyzing {path}...")
    img = Image.open(path).convert("RGBA")
    pixels = list(img.getdata())
    
    # Check for Green
    green_pixels = 0
    for r, g, b, a in pixels:
        if a > 20:
             if g > r + 20 and g > b + 20:
                 green_pixels += 1
    
    print(f"Green pixels found: {green_pixels}")

if __name__ == "__main__":
    analyze(r"C:/Users/ADMIN/.gemini/antigravity/brain/7c8baeda-daff-45a5-9512-a8d5d10419a3/uploaded_media_1770265457857.png")
