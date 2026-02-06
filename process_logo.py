from PIL import Image, ImageFilter
import collections

def is_green(r, g, b):
    # Detect prominent green
    # Green component should be dominant
    return g > r + 30 and g > b + 30

def process_logo(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        pixels = img.load()
        
        new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        new_pixels = new_img.load()
        
        green_count = 0
        non_green_count = 0
        
        # Pass 1: Filter Logic
        # Create a mask image for the "content we want to keep" (White)
        # And remove the "green tick"
        
        content_mask = Image.new("L", (width, height), 0)
        mask_pixels = content_mask.load()
        
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                
                if a < 20: # Skip transparent
                    continue
                
                if is_green(r, g, b):
                    green_count += 1
                    # It's green, we drop it (leave as transparent in new_img)
                    pass 
                else:
                    non_green_count += 1
                    # Keep it. We want it to be WHITE.
                    # We'll mark it in the mask
                    mask_pixels[x, y] = 255
        
        print(f"Green pixels removed: {green_count}")
        print(f"Content pixels kept: {non_green_count}")
        
        # Pass 2: Thickening (Dilation)
        # Since user asked for "clean, sharp edges with thick strokes"
        # We can dilate the mask to thicken lines.
        # MaxFilter(3) is a 3x3 kernel dilation
        
        thickened_mask = content_mask.filter(ImageFilter.MaxFilter(3))
        
        # Pass 3: Reconstruct Final Image
        thick_pixels = thickened_mask.load()
        
        for y in range(height):
            for x in range(width):
                if thick_pixels[x, y] > 128:
                    # Set to Pure White
                    new_pixels[x, y] = (255, 255, 255, 255)
        
        new_img.save(output_path)
        print(f"Saved processed logo to {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    process_logo('public/favicon.png', 'public/logo_white.png')
