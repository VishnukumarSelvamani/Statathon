from PIL import Image
import collections

def analyze_colors(path):
    try:
        img = Image.open(path).convert("RGBA")
        pixels = list(img.getdata())
        colors = collections.Counter(pixels)
        
        print(f"Total pixels: {len(pixels)}")
        print(f"Unique colors: {len(colors)}")
        print("Most common colors (RGBA):")
        for color, count in colors.most_common(20):
            print(f"{color}: {count}")
            
        # Check for green-ish pixels
        green_pixels = 0
        for r, g, b, a in pixels:
            if a > 0:
                # Basic green detection: G is significantly larger than R and B
                if g > r + 20 and g > b + 20:
                    green_pixels += 1
        
        print(f"Estimated green pixels: {green_pixels}")
        
    except Exception as e:
        print(f"Error: {e}")

analyze_colors('public/favicon.png')
