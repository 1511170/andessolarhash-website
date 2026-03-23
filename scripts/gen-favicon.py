import os
from PIL import Image


SRC_PATH = r"c:\Users\camilo\DEVS\andessolarhash-website\figma_images\05_Other\image_24_95.png"
OUT_DIR = r"c:\Users\camilo\DEVS\andessolarhash-website\sites\andessolarhash\public\images\favicons"


def square_center(im: Image.Image) -> Image.Image:
    w, h = im.size
    m = min(w, h)
    left = (w - m) // 2
    top = (h - m) // 2
    return im.crop((left, top, left + m, top + m))


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)

    img = Image.open(SRC_PATH).convert("RGBA")
    sq = square_center(img)

    sizes_png = [16, 32, 48, 180]
    for s in sizes_png:
        sq.resize((s, s), Image.Resampling.LANCZOS).save(
            os.path.join(OUT_DIR, f"favicon-{s}x{s}.png")
        )

    # Apple touch icon
    sq.resize((180, 180), Image.Resampling.LANCZOS).save(
        os.path.join(OUT_DIR, "apple-touch-icon.png")
    )

    # Android-ish large icons
    for s in [192, 512]:
        sq.resize((s, s), Image.Resampling.LANCZOS).save(
            os.path.join(OUT_DIR, f"icon-{s}x{s}.png")
        )

    # ICO legacy
    ico_sizes = [16, 32, 48]
    frames = [
        sq.resize((s, s), Image.Resampling.LANCZOS) for s in ico_sizes
    ]
    frames[0].save(
        os.path.join(OUT_DIR, "favicon.ico"),
        format="ICO",
        sizes=[(s, s) for s in ico_sizes],
    )

    # Web manifest
    manifest = """{
  "name": "Andes Solar Hash",
  "short_name": "Andes Solar Hash",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0b0d1b",
  "theme_color": "#0b0d1b",
  "icons": [
    { "src": "/images/favicons/favicon-32x32.png", "sizes": "32x32", "type": "image/png" },
    { "src": "/images/favicons/favicon-16x16.png", "sizes": "16x16", "type": "image/png" },
    { "src": "/images/favicons/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" },
    { "src": "/images/favicons/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/images/favicons/icon-512x512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
"""
    with open(os.path.join(OUT_DIR, "site.webmanifest"), "w", encoding="utf-8") as f:
        f.write(manifest)

    print("Generated favicons in:", OUT_DIR)


if __name__ == "__main__":
    main()

