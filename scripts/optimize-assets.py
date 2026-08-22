from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "public" / "images"
APP = ROOT / "src" / "app"


def webp(source: Path, destination: Path, max_size: tuple[int, int], quality: int = 84) -> None:
    image = Image.open(source)
    image.thumbnail(max_size, Image.Resampling.LANCZOS)
    mode = "RGBA" if "A" in image.getbands() else "RGB"
    image.convert(mode).save(destination, "WEBP", quality=quality, method=6, exact=True)


def load_font(filename: str, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    windows_font = Path("C:/Windows/Fonts") / filename
    if windows_font.exists():
        return ImageFont.truetype(str(windows_font), size)
    return ImageFont.load_default(size=size)


def social_preview() -> None:
    width, height = 1200, 630
    paper = "#f5edde"
    ink = "#121314"
    orange = "#ef6c1b"
    blue = "#a9d4ee"
    lime = "#d9ef42"

    canvas = Image.new("RGB", (width, height), paper)
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((0, 0, width, 72), fill=ink)
    draw.rectangle((1045, 72, width, height), fill=orange)
    draw.polygon([(610, 170), (1075, 115), (1000, 600), (560, 630)], fill=blue)
    draw.polygon([(56, 564), (520, 548), (560, 560), (84, 582)], fill=lime)

    dog = Image.open(IMAGES / "hero-milo.png").convert("RGBA")
    dog.thumbnail((610, 680), Image.Resampling.LANCZOS)
    canvas.paste(dog, (610, height - dog.height + 34), dog)

    display = load_font("impact.ttf", 104)
    body = load_font("arialbd.ttf", 28)
    body_small = load_font("arialbd.ttf", 22)

    draw.ellipse((42, 24, 62, 44), fill=lime)
    draw.ellipse((62, 18, 74, 30), fill=paper)
    draw.ellipse((34, 12, 46, 24), fill=paper)
    draw.ellipse((48, 6, 60, 18), fill=paper)
    draw.ellipse((66, 8, 78, 20), fill=paper)
    draw.text((90, 19), "PAWFRIEND", font=body, fill=paper)
    draw.text((56, 122), "FIND YOUR\nNEW BEST\nFRIEND.", font=display, fill=ink, spacing=-14)
    draw.text((858, 568), "ADOPTION BY PERSONALITY", font=body_small, fill=ink)

    canvas.save(APP / "opengraph-image.jpg", "JPEG", quality=88, optimize=True, progressive=True)


def main() -> None:
    targets = [
        (IMAGES / "hero-milo.png", IMAGES / "hero-milo.webp", (1000, 1200), 86),
        (IMAGES / "personality-otis.png", IMAGES / "personality-otis.webp", (920, 1000), 84),
        (IMAGES / "featured-miso.png", IMAGES / "featured-miso.webp", (760, 1100), 84),
        (IMAGES / "final-pet-group.png", IMAGES / "final-pet-group.webp", (1200, 800), 84),
        (IMAGES / "story" / "luna-shelter.png", IMAGES / "story" / "luna-shelter.webp", (560, 700), 82),
        (IMAGES / "story" / "luna-home.png", IMAGES / "story" / "luna-home.webp", (560, 700), 82),
    ]

    for name in ("milo", "luna", "pepper", "otis", "nori"):
        targets.append(
            (IMAGES / "residents" / f"{name}.png", IMAGES / "residents" / f"{name}.webp", (640, 640), 82),
        )

    for source, destination, max_size, quality in targets:
        webp(source, destination, max_size, quality)

    social_preview()


if __name__ == "__main__":
    main()
