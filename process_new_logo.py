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
                
                # Calculate brightness (luminance)
                # We use this as the alpha for the white version
                # Logic: Brighter original pixels = More opaque white
                # Darker original pixels (black background) = Transparent
                
                luminance = int(0.299*r + 0.587*g + 0.114*b)
                
                # Threshold to strictly remove the black background noise
                if luminance < 10:
                    alpha = 0
                else:
                    # Boost alpha slightly to make the logo pop more
                    alpha = min(255, int(luminance * 1.5))
                
                if alpha > 0:
                    white_pixels[x, y] = (255, 255, 255, alpha)
        
        # Save the high-res white logo
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            
        full_logo_path = os.path.join(output_dir, "logo_white.png")
        white_img.save(full_logo_path)
        print(f"Saved {full_logo_path}")
        
        # Generate Favicons
        # 1. favicon.ico (multi-size)
        # 2. favicon-32x32.png
        # 3. favicon-16x16.png
        
        print("Generating favicons...")
        icon_sizes = [(32, 32), (16, 16)]
        white_img.save(os.path.join(output_dir, "favicon.ico"), sizes=[(64,64), (32,32), (16,16)])
        
        resized_32 = white_img.resize((32, 32), Image.Resampling.LANCZOS)
        resized_32.save(os.path.join(output_dir, "favicon-32x32.png"))
        
        resized_16 = white_img.resize((16, 16), Image.Resampling.LANCZOS)
        resized_16.save(os.path.join(output_dir, "favicon-16x16.png"))
        
        # Also save as the main favicon.png for general use
        white_img.save(os.path.join(output_dir, "favicon.png"))
        
        print("Done.")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    input_file = r"C:/Users/ADMIN/.gemini/antigravity/brain/7c8baeda-daff-45a5-9512-a8d5d10419a3/uploaded_media_1770265457857.png"
    output_directory = r"d:\vishnu\stat\public"
    process_logo(input_file, output_directory)
