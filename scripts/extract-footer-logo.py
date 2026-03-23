import re
import base64
import pathlib

src = pathlib.Path(r"c:\Users\camilo\DEVS\andessh\index.html")
text = src.read_text(encoding="utf-8", errors="ignore")
m = re.search(
    r'<footer id="contacto">.*?<img src="data:image/png;base64,([^"]+)"',
    text,
    re.DOTALL,
)
if not m:
    raise SystemExit("footer img not found")
raw = base64.b64decode(m.group(1))
out = pathlib.Path(__file__).resolve().parent.parent / "public" / "images" / "brand-footer-logo.png"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_bytes(raw)
print(f"wrote {out} ({len(raw)} bytes)")
