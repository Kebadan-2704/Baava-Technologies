import sys
from PIL import Image

def remove_bg(in_path, out_path):
    img = Image.open(in_path).convert("RGBA")
    datas = img.get_flattened_data() if hasattr(img, 'get_flattened_data') else img.getdata()
    newData = []
    
    for item in datas:
        r, g, b, a = item[0], item[1], item[2], item[3]
        # Remove any whitish pixels left over (anti-aliasing halo)
        if r > 170 and g > 170 and b > 170:
            newData.append((255, 255, 255, 0))
        else:
            newData.append((r, g, b, a))
            
    img.putdata(newData)
    img.save(out_path, "PNG")
    print("Success")

if __name__ == "__main__":
    remove_bg(r"c:\Users\Keba\Desktop\Baava-Technologies\public\logo.png", r"c:\Users\Keba\Desktop\Baava-Technologies\public\logo-transparent.png")
