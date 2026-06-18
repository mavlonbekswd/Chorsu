#!/usr/bin/env python3
"""Velvet Slate — Plate II. A surface-&-stone material study. PIL, 2x supersample."""
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

SS = 2
W, H = 2000 * SS, 2667 * SS
FONTS = "/Users/user/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/7783e5c1-1aad-46bc-b271-4717dde58a5a/a2b0e593-985c-48a6-9671-f6e45cb52c72/skills/canvas-design/canvas-fonts"

# palette — deep warm slate + three rationed stones
G_TOP   = (18, 20, 24)
G_BOT   = (27, 31, 38)
PANEL   = (26, 30, 37)
PANEL_HI= (32, 37, 45)
BORDER  = (48, 55, 65)
BORDER2 = (66, 74, 86)
INK     = (228, 231, 237)
MUTE    = (140, 149, 162)
FAINT   = (88, 96, 108)
TURQ    = (52, 184, 173)
TERRA   = (201, 92, 51)
GOLD    = (214, 162, 60)

def F(name, size): return ImageFont.truetype(f"{FONTS}/{name}", int(size * SS))
def s(v): return int(v * SS)

# ---- ground: vertical tonal gradient + faint grain ----
col = np.linspace(0, 1, H)[:, None, None]
top = np.array(G_TOP, float); bot = np.array(G_BOT, float)
field = (top * (1 - col) + bot * col)
field = np.repeat(field, W, axis=1).astype(np.uint8)
field = field + np.random.default_rng(5).normal(0, 2.2, (H, W, 1)).astype(np.int16)
base = Image.fromarray(np.clip(field, 0, 255).astype(np.uint8), "RGB")
draw = ImageDraw.Draw(base, "RGBA")

def soft_shadow(box, radius, blur, alpha, dy):
    x0, y0, x1, y1 = box
    lay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    ld = ImageDraw.Draw(lay)
    ld.rounded_rectangle([x0, y0 + dy, x1, y1 + dy], radius=radius, fill=(0, 0, 0, alpha))
    lay = lay.filter(ImageFilter.GaussianBlur(blur))
    base.paste(Image.alpha_composite(base.convert("RGBA"), lay).convert("RGB"), (0, 0))

def rrect(box, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)

def ctext(cx, y, t, font, fill, ls=0):
    if ls:
        # letter-spaced centered
        widths = [draw.textbbox((0,0), c, font=font)[2] for c in t]
        total = sum(widths) + ls * (len(t) - 1)
        x = cx - total / 2
        for c, wd in zip(t, widths):
            draw.text((x, y), c, font=font, fill=fill); x += wd + ls
    else:
        bb = draw.textbbox((0, 0), t, font=font)
        draw.text((cx - (bb[2]-bb[0])/2, y), t, font=font, fill=fill)

def rtext(x, y, t, font, fill):
    bb = draw.textbbox((0, 0), t, font=font)
    draw.text((x - (bb[2]-bb[0]), y), t, font=font, fill=fill)

# fonts
title = F("Italiana-Regular.ttf", 96)
serif_i = F("CrimsonPro-Italic.ttf", 34)
mono = F("DMMono-Regular.ttf", 18)
mono_s = F("DMMono-Regular.ttf", 14)
label = F("Jura-Medium.ttf", 19)
label_s = F("Jura-Medium.ttf", 15)
MARG = s(170)

# ---------- header ----------
draw.text((MARG, s(150)), "Velvet", font=title, fill=INK)
draw.text((MARG, s(252)), "Slate", font=title, fill=INK)
rtext(W - MARG, s(168), "PL. II", mono, INK)
rtext(W - MARG, s(204), "SURFACE  &  STONE", label_s, MUTE)
rtext(W - MARG, s(232), "A MATERIAL STUDY", label_s, FAINT)
draw.line([(MARG, s(392)), (W - MARG, s(392))], fill=BORDER2, width=s(1.4))
draw.line([(MARG, s(398)), (W - MARG, s(398))], fill=BORDER, width=s(1))
draw.text((MARG, s(414)), "C A L M   S U R F A C E   ·   R A R E   L I G H T", font=label, fill=MUTE)

# ---------- the spec chip (central card) ----------
cx0, cy0, cx1, cy1 = MARG, s(540), W - MARG, s(1600)
soft_shadow((cx0, cy0, cx1, cy1), s(34), s(40), 120, s(26))
rrect((cx0, cy0, cx1, cy1), s(34), fill=PANEL, outline=BORDER, width=s(1.4))
# inner hairline for depth
rrect((cx0 + s(1.4), cy0 + s(1.4), cx1 - s(1.4), cy1 - s(1.4)), s(33), outline=(255,255,255,8), width=s(1))

# chip header
draw.text((cx0 + s(48), cy0 + s(40)), "SPEC. CHIP — 01", font=mono_s, fill=FAINT)
rtext(cx1 - s(48), cy0 + s(40), "RGB · ELEVATION · RADIUS", mono_s, FAINT)
draw.line([(cx0 + s(48), cy0 + s(80)), (cx1 - s(48), cy0 + s(80))], fill=BORDER, width=s(1))

# ----- three stones, bezelled like jewellery -----
stones = [("TURQUOISE", "ACTIVE",   TURQ,  "#34B8AD"),
          ("TERRACOTTA","PRIMARY",  TERRA, "#C95C33"),
          ("GOLD",      "EMPHASIS", GOLD,  "#D6A23C")]
sw = s(212); gap = s(70)
row_w = sw * 3 + gap * 2
sx = (W - row_w) / 2
sy = cy0 + s(150)
for i, (name, role, col_s, hexs) in enumerate(stones):
    x = sx + i * (sw + gap)
    # recessed seat
    rrect((x - s(14), sy - s(14), x + sw + s(14), sy + sw + s(14)), s(30), fill=PANEL_HI, outline=BORDER, width=s(1))
    # the stone
    soft_shadow((x, sy, x + sw, sy + sw), s(24), s(16), 90, s(8))
    rrect((x, sy, x + sw, sy + sw), s(24), fill=col_s)
    # bezel: fine bright ring + top sheen
    rrect((x, sy, x + sw, sy + sw), s(24), outline=(255, 255, 255, 40), width=s(1.4))
    draw.line([(x + s(26), sy + s(20)), (x + sw - s(26), sy + s(20))], fill=(255,255,255,46), width=s(2))
    # labels
    ctext(x + sw/2, sy + sw + s(34), name, label, INK, ls=s(2))
    ctext(x + sw/2, sy + sw + s(64), role, label_s, MUTE, ls=s(3))
    ctext(x + sw/2, sy + sw + s(90), hexs, mono_s, FAINT)
    # tiny crosshair tick above
    draw.line([(x + sw/2 - s(8), sy - s(30)), (x + sw/2 + s(8), sy - s(30))], fill=FAINT, width=s(1))
    draw.line([(x + sw/2, sy - s(38)), (x + sw/2, sy - s(22))], fill=FAINT, width=s(1))

# ----- dual tonal ramps: LIGHT mode + DARK mode surfaces -----
ramp_y = sy + sw + s(150)
def ramp(yy, title_t, tones):
    draw.text((cx0 + s(48), yy - s(34), ), title_t, font=label_s, fill=MUTE)
    n = len(tones); bw = (cx1 - cx0 - s(96)) / n
    for i, (hx, rgb) in enumerate(tones):
        x = cx0 + s(48) + i * bw
        draw.rectangle([x, yy, x + bw - s(2), yy + s(96)], fill=rgb)
        # hairline divisions
        draw.rectangle([x, yy, x + bw - s(2), yy + s(96)], outline=BORDER, width=s(1))
        draw.text((x + s(10), yy + s(70)), hx, font=mono_s, fill=(20,20,24) if sum(rgb) > 380 else (200,205,212))
    # frame
    rrect((cx0 + s(48), yy, cx1 - s(48) - s(2), yy + s(96)), s(10), outline=BORDER2, width=s(1.2))

light_tones = [("#ECEEF2",(236,238,242)),("#F6F7F9",(246,247,249)),("#FCFCFD",(252,252,253)),
               ("#E2E5EB",(226,229,235)),("#6E7682",(110,118,130)),("#1F2430",(31,36,48))]
dark_tones  = [("#14161A",(20,22,26)),("#191C22",(25,28,34)),("#1E2229",(30,34,41)),
               ("#282D36",(40,45,54)),("#979FAB",(151,159,171)),("#E6E8EE",(230,232,238))]
ramp(ramp_y, "LIGHT  ·  SURFACES", light_tones)
ramp(ramp_y + s(190), "DARK  ·  SURFACES", dark_tones)

# ----- faint girih thread inside the chip footer -----
gy = ramp_y + s(190) + s(96) + s(60)
draw.line([(cx0 + s(48), gy), (cx1 - s(48), gy)], fill=BORDER, width=s(1))
gpat = Image.new("RGBA", (W, H), (0,0,0,0)); gp = ImageDraw.Draw(gpat)
step = s(34)
y = gy + s(28)
for gx in range(int(cx0 + s(48)), int(cx1 - s(48)), step):
    gp.line([(gx, y+s(40)), (gx+step/2, y), (gx+step, y+s(40)), (gx+step/2, y+s(80)), (gx, y+s(40))], fill=(*TURQ, 26), width=s(1))
base.paste(Image.alpha_composite(base.convert("RGBA"), gpat).convert("RGB"), (0,0))
# clip girih to a soft band by re-drawing chip edges? keep subtle.
draw.text((cx0 + s(48), gy + s(96)), "GIRIH · QUIET THREAD", font=mono_s, fill=FAINT)
rtext(cx1 - s(48), gy + s(96), "RADIUS 16–24 · BORDER 1px", mono_s, FAINT)

# ---------- phrase + footer ----------
ctext(W/2, s(1880), "warmth, set in stone — light meets it only where it must", serif_i, INK)

fy = s(2470)
draw.line([(MARG, fy), (W - MARG, fy)], fill=BORDER2, width=s(1.2))
draw.text((MARG, fy + s(18)), "VELVET SLATE", font=label_s, fill=MUTE)
ctext(W/2, fy + s(18), "C H O R S U", label_s, MUTE)
rtext(W - MARG, fy + s(18), "ED. MMXXVI", mono_s, MUTE)

# corner registration ticks
for cxk, cyk in [(s(74), s(74)), (W - s(74), s(74)), (s(74), H - s(74)), (W - s(74), H - s(74))]:
    draw.line([(cxk - s(16), cyk), (cxk + s(16), cyk)], fill=FAINT, width=s(1))
    draw.line([(cxk, cyk - s(16)), (cxk, cyk + s(16))], fill=FAINT, width=s(1))

final = base.resize((2000, 2667), Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=1.1, percent=64, threshold=2))
final.save("/Users/user/Desktop/Chorsu/design/velvet-slate-plate.png")
print("saved velvet-slate-plate.png", final.size)
