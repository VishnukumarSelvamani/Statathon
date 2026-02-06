from PIL import Image
import os

def process_logo(input_path, output_dir):
    try:
        print(f"Opening {input_path}...")
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        
        # New image for the white version
        white_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        white_pixels = white_img.load()
        pixels = img.load()
        
        print("Processing pixels...")
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                
                if a < 20: 
                    continue
                
                # DETECT GREEN TICK
                # Green is dominant
                is_green = (g > r + 20) and (g > b + 20)
                
                if is_green:
                    # REMOVE: Make it transparent
                    white_pixels[x, y] = (0, 0, 0, 0)
                else:
                    # KEEP: Shield/Padlock/Laurels -> Make White
                    white_pixels[x, y] = (255, 255, 255, a)
        
        # Save the high-res white logo
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            
        full_logo_path = os.path.join(output_dir, "logo_white.png")
        white_img.save(full_logo_path)
        print(f"Saved {full_logo_path}")
        
        # Generate Favicons
        print("Generating favicons...")
        white_img.save(os.path.join(output_dir, "favicon.ico"), sizes=[(64,64), (32,32), (16,16)])
        
        resized_32 = white_img.resize((32, 32), Image.Resampling.LANCZOS)
        resized_32.save(os.path.join(output_dir, "favicon-32x32.png"))
        
        resized_16 = white_img.resize((16, 16), Image.Resampling.LANCZOS)
        resized_16.save(os.path.join(output_dir, "favicon-16x16.png"))
        
        # Generic favicon.png
        white_img.save(os.path.join(output_dir, "favicon.png"))
        
        print("Done.")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Using the Shield+Lock image from Step 106
    input_file = r"C:/Users/ADMIN/.gemini/antigravity/brain/7c8baeda-daff-45a5-9512-a8d5d10419a3/uploaded_media_1770265457857.png"
    output_directory = r"d:\vishnu\stat\public"
    process_logo(input_file, output_directory)
