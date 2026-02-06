from PIL import Image
import collections

def analyze_colors(path):
    try:
        img = Image.open(path).convert("RGBA")
        pixels = list(img.getdata())
        colors = collections.Counter(pixels)
        
        with open("colors.txt", "w", encoding="utf-8") as f:
            f.write(f"Total pixels: {len(pixels)}\n")
            f.write(f"Unique colors: {len(colors)}\n")
            f.write("Most common colors (RGBA):\n")
            for color, count in colors.most_common(50):
                f.write(f"{color}: {count}\n")
                
    except Exception as e:
        with open("colors.txt", "w", encoding="utf-8") as f:
            f.write(f"Error: {e}\n")

analyze_colors('public/favicon.png')
