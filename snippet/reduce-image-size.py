from PIL import Image

im = Image.open(img.png)
im.convert('P', palette=Image.ADAPTIVE, colors=256).save(img.png)
